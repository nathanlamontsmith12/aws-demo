import { gql, useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";

const getEnumsQuery = gql`
    query {
        enums {
            dataQualityFileTypes
        }
    }
`;

export const ReactEnumsContext = createContext({});

export const Enums = ({ children }) => {
    const { data } = useQuery(getEnumsQuery, { fetchPolicy: "no-cache" });
    const [enums, setEnums] = useState({});
    useEffect(() => {
        if (data) {
            setEnums(data?.enums);
        }
    }, [data]);
    return (
        <ReactEnumsContext.Provider value={{
            ...enums
        }}>
            { children }
        </ReactEnumsContext.Provider>
    );
};