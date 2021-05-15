import React from 'react';
import ShowMoreText from 'react-show-more-text';

const Task = ({task,HandleChangeEvent}) => {
    // console.log("task is",task);
    return (
        <div className="flex-row">
             <div>
                <input type="checkbox" id={task.id} value={task.id} checked={task.completed} onChange={(e)=>HandleChangeEvent(e.target.checked,task.id)}/>
             </div>
             <div className="content">
                 <label htmlFor={task.title} ><b>{task.title}</b></label>
                 <ShowMoreText lines={1}><p>{task.description}</p></ShowMoreText>
                 
             </div>
             <div className="edit">
                 <i className="fas fa-pen fa-lg edit-icon icons"  ></i>
                 <br></br>
                 <i className="fas fa-minus-square fa-lg delete-icon icons"></i>
             </div> 
        </div>  );
}
 
export default Task;