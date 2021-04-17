import React, { Component } from 'react';
import Task from './task';

class TasksList extends Component {
    render() { 
        const {tasks} = this.props;
        return ( <div>{tasks.map((val,index)=>{
            return <div key={index}>
                    <Task task={val}></Task>
                    </div>
        })}</div>);
    }
}
 
export default TasksList;