import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Analyze from './analyze';
import Home from './home';
import Login from './login';
import NavBar from './navbar';
const TodoMain = () => {
    return ( 
        <>
            <NavBar/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/analyze" component={Analyze}/>
                <Route path="/search/:name" component={Login}/>
            </Switch>
        </>
        
     );
}
 
export default TodoMain;