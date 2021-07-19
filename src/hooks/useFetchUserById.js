import { useState, useEffect } from "react";
import { getUserById } from "../helpers/getUserById";

export const useFetchUserById = (userId) => {
    const [userById, setUserById] = useState({
        userFound: [],
        loading: true
    });

    useEffect(() => {
        getUserById(userId)
        .then(user => {
            setUserById({
                userFound: user,
                loading: false
            });
        });
    }, [userId]);

    console.log(userById)

    return userById;
}