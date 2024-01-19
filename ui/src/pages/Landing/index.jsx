import React from "react";
import { gql, useQuery } from "@apollo/client"
import { Loading } from "../../components/Loading/index.jsx";

export const Landing = () => {
    const { loading, error, data } = useQuery(gql`
        query {
            documents {
                id
                name
            }
        }
    `);

    if (error) {
        console.log(error);
        return "Oh no! Error!!";
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <h1>Landing</h1>
            <ul>
                { data?.documents?.map((document) => <li key={document.id}>{document.name}</li>) }
            </ul>
        </div>
    );
}