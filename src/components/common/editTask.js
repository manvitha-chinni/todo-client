import React,{useState, useContext} from 'react';
import { createTask, getAllTasks, getTasks, updateTask } from '../../services/taskService';
import { updateTasksContext } from '../taskPage';
const EditTask = (props) => {
    const {header,task:existingTask,onComplete,date,tasksType} =props;
    const defaultData ={};
    const updateTasks = useContext(updateTasksContext);
    
    defaultData.title=existingTask.title || "";
    defaultData.description=existingTask.description || "";
    defaultData.notify=existingTask.notify || false;
    defaultData.date=existingTask.date || date;
    defaultData.time=existingTask.time || "";

    const [task,updateEditTask] = useState(defaultData);

    const onTitleChange = (event)=>{
        const title = event.target.value;
        updateEditTask({...task,title});

    }
    const onDateChange = (event)=>{
        const date = event.target.value;
        updateEditTask({...task,date});
    }
    const onTimeChange = (event)=>{
        const time = event.target.value;
        updateEditTask({...task,time});
    }
    const onDescriptionChange = (event)=>{
        const description = event.target.value;
        updateEditTask({...task,description});
    }
    const onNotifyChange = (event)=>{
        const notify = event.target.checked;
        updateEditTask({...task,notify})
    }
    const onCancel=()=>{
        onComplete();
    }
    const onSave = async ()=>{
        let data;
        try{
            if(header==="New Task"){
                await createTask(task);
            }else{
                await updateTask(task,existingTask.id);
            }
            const {data} = tasksType?await getAllTasks(): await getTasks({date});
            updateTasks(data);
            onComplete();
        }
        catch(e){console.log("something went worng while save task! ")}
    }
    return ( 
    <>
        <h5 className="text-primary">{header}</h5>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" value={task.title} onChange={onTitleChange} placeholder="Enter title"></input>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 form-group"> 
                    <label htmlFor="selectDate">Date</label>
                    <input type="date" className="form-control" value={task.date} onChange={onDateChange} id="selectDate"/>
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label htmlFor="selectTime">Time</label>
                    <input type="time" className="form-control" value={task.time} onChange={onTimeChange} id="selectTime"/>
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" value={task.description} onChange={onDescriptionChange} rows="3"></textarea>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="notify" checked={task.notify} onChange={onNotifyChange}></input>
                <label className="form-check-label" htmlFor="notify">Notify</label>
            </div>
            <br></br>
            <div  className="btn btn-primary float-right ml-3" onClick={onSave}>Save</div>
            <div  className="btn btn-warning float-right" onClick={onCancel}>Cancel</div>
    </>
     );
}
 
export default EditTask;