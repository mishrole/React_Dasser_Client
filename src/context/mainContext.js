import { createContext} from "react";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {

    // const [params, setParams] = useState({lastname: '', login: '', status: 1});
    // const { users } = useFetchUsers(params);

    return (
        // <MainContext.Provider value={ {users} }>
        <MainContext.Provider value = {{}}>
            { children }
        </MainContext.Provider>
    )
}

export default MainContext;

export { MainContextProvider };