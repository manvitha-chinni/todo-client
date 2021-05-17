import React from 'react';
import Task from './task';


const TaskList = ({tasks,handleCheckedEvent,onEditClick}) => {
    return (  <div>{tasks.map((val,index)=>{
        return <div key={index}>
                <Task 
                task={val} 
                handleCheckedEvent={handleCheckedEvent}
                onEditClick={onEditClick}/>
                </div>
    })}</div> );
}
 
export default TaskList;