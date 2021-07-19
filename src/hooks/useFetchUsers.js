import { useState, useEffect } from "react";
import { getUsers } from "../helpers/getUsers";

export const useFetchUsers = (params) => {
    const [user, setUser] = useState({
        users: [],
        loading: true
    });

    useEffect(() => {
        getUsers(params)
        .then(user => {
            setUser({
                users: user,
                loading: false
            });
        });
    }, [params])

    return user;
}