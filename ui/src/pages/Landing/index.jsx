import React from "react";
import { gql, useQuery } from "@apollo/client"
import { Loading } from "../../components/Loading/index.jsx";

export const Landing = () => {
    const { loading, error, data } = useQuery(gql`
        query {
            users {
                id
                firstName
                lastName
            }
        }
    `);

    if (error) {
        return "Oh no! Error!!";
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <h1>Landing</h1>
            <ul>
                { data?.users?.map((user) => <li key={user.id}>{user.firstName} {user.lastName}</li>) }
            </ul>
        </div>
    );
}