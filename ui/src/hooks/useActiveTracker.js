import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

// also use as default value if interval prop is undefined :: 
const MINIMUM_POLL_INTERVAL = 2000;

const getPollInterval = (interval) => {
    return Number.isSafeInteger(interval) && interval > MINIMUM_POLL_INTERVAL 
        ? interval 
        : MINIMUM_POLL_INTERVAL;
};


export const useActiveTracker = ({
    query, 
    stopOnError = true, 
    onFetch = null, 
    stopIf = null,
    transform = null,
    interval = null,
    defaultData = null
}) => {
    const shouldTransformDataOnFetch = typeof transform === "function";

    const [latestData, setLatestData] = useState(defaultData);
    const pollingIdRef = useRef(null);

    const { 
        data, 
        error, 
        refetch
    } = useQuery(query, { fetchPolicy: "no-cache" });

    const stop = () => {
        clearInterval(pollingIdRef.current);
        console.log("Stop :: ", pollingIdRef);
    };
    
    const start = () => {
        stop();
        pollingIdRef.current = setInterval(() => {
            console.log("Polling....");
            refetch();
        }, getPollInterval(interval));
        console.log("Start :: ", pollingIdRef);
    };

    useEffect(() => {
        start();
        return stop;
    }, []);

    useEffect(() => {
        if (data) {
            const dataToUse = shouldTransformDataOnFetch 
                ? transform(data)
                : data;
            
            setLatestData(dataToUse);

            if (typeof onFetch === "function") {
                onFetch(dataToUse);
            }

            if (typeof stopIf === "function") {
                const stopPolling = stopIf(dataToUse);
                if (stopPolling) {
                    clearInterval(pollingIdRef.current);
                }
            }
        }
    }, [data]);

    if (stopOnError === true && error) {
        clearInterval(pollingIdRef.current);
    }
    
    return [
        latestData, 
        { 
            data, 
            error, 
            refetch, 
            start, 
            stop 
        }
    ];
};