import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../auth/authReducer";

const MainContext = createContext();

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || {
        logged: false
    }
}

const MainContextProvider = ({ children }) => {
    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    return (
        <MainContext.Provider value = {{ user, dispatch }}>
            { children }
        </MainContext.Provider>
    )
}

export default MainContext;

export { MainContextProvider };