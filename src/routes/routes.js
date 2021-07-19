import { Redirect, Switch, Route } from 'react-router-dom';
import { MainContextProvider } from '../context/mainContext';
import { LoginPage } from '../pages/_login/LoginPage';
import { UserIdPage } from '../pages/_user/UserIdPage';
import { UserPage } from '../pages/_user/UserPage';

const Root = () => {
    return (
        <MainContextProvider>
            <Switch>
                <Route path = "/login" component = { LoginPage } />
                <Route path = "/user/:userId" component =  { UserIdPage }/>
                <Route path = "/user" component = { UserPage } />
                <Redirect from = "/" to = "/login" />
            </Switch>
        </MainContextProvider>
    )
}

export default Root;