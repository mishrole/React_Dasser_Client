import { Redirect, Switch, Route } from 'react-router-dom';
import { MainContextProvider } from '../context/mainContext';
import { LoginPage } from '../pages/_login/LoginPage';
import { UserIdPage } from '../pages/_user/UserIdPage';
import { UserPage } from '../pages/_user/UserPage';
import { UserRegisterPage } from '../pages/_user/UserRegisterPage';
import { PrivateRoute } from './PrivateRoute';

const Root = (/*{value}*/) => {

    // const test= useContext(MainContext);
    // console.log(test);
    // console.log(value)

    return (
        <MainContextProvider>
            <Switch>
                <Route path = "/login" component = { LoginPage } />
                <Route path = "/user/create" component = { UserRegisterPage }/>
                <Route path = "/user/edit/:userId" component =  { UserIdPage }/>
                <Route path = "/user" component = { UserPage } />
                <Redirect from = "/" to = "/login" />
                {/* <PrivateRoute path="/" component= {LoginPage} isAuthenticated = { true }></PrivateRoute> */}
            </Switch>
        </MainContextProvider>
    )
}

export default Root;