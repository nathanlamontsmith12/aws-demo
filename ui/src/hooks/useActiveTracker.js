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

    useEffect(() => {
        let id;
        if (pollingIdRef.current === null) {
            id = setInterval(refetch, getPollInterval(interval));
            pollingIdRef.current = id;
        }

        // clean-up function :: 
        return () => {
            clearInterval(id);
            clearInterval(pollingIdRef.current);
        };
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
    
    return [
        latestData, 
        { 
            data, 
            error, 
            refetch, 
            stopPolling: () => clearInterval(pollingIdRef.current)
        }
    ];
};