import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Analyze from './analyze';
import Dailyroutine from './dailyroutine';
import Dashboard from './dashboard';
import Login from './login';
import NavBar from './navbar';
import Tasks from './tasks';
const TodoMain = () => {
    return ( 
        <>
            <NavBar/>
            <Switch>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/analyze" component={Analyze}/>
                <Route path="/search/:name" component={Login}/>
                <Route path="/tasks" component={Tasks}/>
                <Route path="/dailyroutine" component={Dailyroutine} />
            </Switch>
        </>
        
     );
}
 
export default TodoMain;