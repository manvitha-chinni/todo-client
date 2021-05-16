import React from 'react';
import ShowMoreText from 'react-show-more-text';

const Task = ({task,HandleChangeEvent}) => {
    // console.log("task is",task);
    return (
        <div className="flex-row shadow m-2">
             <div>
                <input className="cursor-pointer" type="checkbox" id={task.id} value={task.id} checked={task.completed} onChange={(e)=>HandleChangeEvent(e.target.checked,task.id)}/>
             </div>
             <div className="task-content">
                 <label className="cursor-pointer" htmlFor={task.id} ><b>{task.title}</b></label>
                 <ShowMoreText lines={1}><p>{task.description}</p></ShowMoreText>
                 
             </div>
             <div className="task-edit shadow">
                 <i className="fas fa-pen fa-lg edit-icon"  ></i>
                 <br></br>
                 <i className="fas fa-minus-square fa-lg delete-icon"></i>
             </div> 
        </div>  );
}
 
export default Task;