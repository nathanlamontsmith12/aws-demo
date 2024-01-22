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
    const [mounting, setMounting] = useState(true);
    const pollingIdRef = useRef(null);

    const { 
        data, 
        error, 
        refetch
    } = useQuery(query, { fetchPolicy: "no-cache" });

    useEffect(() => {
        // sometimes react makes you do silly workarounds >.<
        const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            setMounting(false);
        }, 0);

        if (pollingIdRef.current === null) {
            pollingIdRef.current = setInterval(() => {
                refetch();
            }, getPollInterval(interval));
        }

        // clean-up function :: 
        return () => {
            if (mounting !== true) {
                // getting around the initial invocation of clean-up function 
                // when component mounts :: 
                clearInterval(pollingIdRef.current);
            }
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

    if (stopOnError === true && error) {
        clearInterval(pollingIdRef.current);
    }
    
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