import React, { useContext } from 'react';
import ShowMoreText from 'react-show-more-text';
import { deleteItemFromList } from '../../services/helpers';
import { deleteTask } from '../../services/taskService';
import { tasksContext, updateTasksContext } from '../taskPage';

const Task = ({task,handleCheckedEvent,onEditClick}) => {

    const tasks = useContext(tasksContext);
    const updateTasks = useContext(updateTasksContext);
    const onDeleteClick = async(id)=>{
        try{
            const {data} = await deleteTask(id);
            updateTasks(deleteItemFromList(tasks,data));
        }
        catch(e){}
    }
    return (
        <div className="flex-row shadow m-2">
             <div>
                <input className="cursor-pointer custom-checked" style={{marginLeft:"5px"}} type="checkbox" id={task.id}  checked={task.completed} onChange={(e)=>handleCheckedEvent(e.target.checked,task)}/>
             </div>
             <div className="task-content" >
                <div className="title-time">
                    <label className="cursor-pointer" htmlFor={task.id} ><b className="d-inline">{task.title}</b> </label>
                    <p  className="d-inline">{task.time}</p>
                </div>
                <div  style={{marginBottom: "5px"}}>
                <ShowMoreText lines={1}><p>{task.description}</p></ShowMoreText>
                </div>
                 
             </div>
             <div className="task-edit shadow">
                 <i className="fas fa-pen fa-lg edit-icon" onClick={()=>onEditClick(task)} ></i>
                 <br></br>
                 <i className="fas fa-minus-square fa-lg delete-icon" onClick={()=>onDeleteClick(task.id)}></i>
             </div> 
        </div>  );
}
 
export default Task;