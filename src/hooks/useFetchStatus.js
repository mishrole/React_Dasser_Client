import { useState, useEffect } from "react";
import { getStatus } from "../helpers/getStatus";

export const useFetchStatus = () => {
    const [status, setStatus] = useState({
        status: [],
        loading: true
    });

    useEffect(() => {
        getStatus()
        .then(status => {
            setStatus({
                status: status,
                loading: false
            });
        });
    }, [])

    return status;
}