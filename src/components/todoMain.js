import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Analyze from './analyze';
import DailyroutinesPage from './dailyroutinesPage';
import Dashboard from './dashboard';
import Login from './login';
import NavBar from './navbar';
import TaskPage from './taskPage';
const TodoMain = () => {
    return ( 
        <>
            <NavBar/>
            <Switch>
                <Route path="/analyze" component={Analyze}/>
                <Route path="/search/:name" component={Login}/>
                {/* <Route path="/tasks/new" component={NewTasks}/> */}
                <Route path="/tasks" component={TaskPage}/>
                <Route path="/dailyroutine" component={DailyroutinesPage} />
                <Redirect from="/" to="dailyroutine"/>
            </Switch>
        </>
        
     );
}
 
export default TodoMain;