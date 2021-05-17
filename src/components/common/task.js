import React from 'react';
import ShowMoreText from 'react-show-more-text';
import { deleteTask } from '../../services/taskService';

const Task = ({task,handleCheckedEvent,onEditClick}) => {
    // console.log("task is",task);

    const onDeleteClick = async(id)=>{
        try{
            await deleteTask(id);
            window.location.href="tasks/";
        }
        catch(e){}
    }
    return (
        <div className="flex-row shadow m-2">
             <div>
                <input className="cursor-pointer" type="checkbox" id={task.id}  checked={task.completed} onChange={(e)=>handleCheckedEvent(e.target.checked,task)}/>
             </div>
             <div className="task-content">
                 <label className="cursor-pointer" htmlFor={task.id} ><b>{task.title}</b></label>
                 <ShowMoreText lines={1}><p>{task.description}</p></ShowMoreText>
                 
             </div>
             <div className="task-edit shadow">
                 <i className="fas fa-pen fa-lg edit-icon" onClick={()=>onEditClick(task)} ></i>
                 <br></br>
                 <i className="fas fa-minus-square fa-lg delete-icon" onClick={()=>onDeleteClick(task.id)}></i>
             </div> 
        </div>  );
}
 
export default Task;