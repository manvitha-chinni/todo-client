import React from 'react';
import Task from './task';


const TaskList = ({tasks,HandleChangeEvent,onEditClick}) => {
    return (  <div>{tasks.map((val,index)=>{
        return <div key={index}>
                <Task 
                task={val} 
                HandleChangeEvent={HandleChangeEvent}
                onEditClick={onEditClick}/>
                </div>
    })}</div> );
}
 
export default TaskList;