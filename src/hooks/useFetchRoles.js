import { useState, useEffect } from "react";
import { getRoles } from "../helpers/getRoles";

export const useFetchRoles = () => {
    const [roles, setroles] = useState({
        roles: [],
        loading: true
    });

    useEffect(() => {
        getRoles()
        .then(role => {
            setroles({
                roles: role,
                loading: false
            });
        });
    }, [])

    return roles;
}