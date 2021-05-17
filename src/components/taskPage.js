
import React, {useState,useEffect} from 'react';
import TasksList from './common/tasksList';
import Modal from 'react-modal';
import EditTask from './common/editTask';
// import { event } from 'jquery';
import { getTasks,updateCheckedTask } from '../services/taskService';
import { cloneJsonObject, getCurrentDate, getTomorrowDate, getYesterdayDate } from '../services/helpers';
Modal.setAppElement("#root");


const TaskPage = () => {
    const modalOptions={
        overlay:{
            position:"fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            background:"rgba(0,0,0,0.3)"
        },
        content:{
            margin:"auto",
            width:"65%",
            height:"fit-content"
        }
    }
    
    const [tasks,updateTasks] = useState([]);

    const [completedTasks,updateCompletedTasks] = useState([]);
    const [pendingTasks,updatePendingTasks] = useState([]);
    const [isModalOpen,toggleModal] = useState(false);
    const [editHeader,updateEditHeader] = useState("");
    const [editTask,updateEditTask] = useState({});
    const [dateObject, updateDateObject] = useState(getCurrentDate());

    useEffect(async ()=>{
        try{
            const {data} =await getTasks();
            updateTasks(data);
            console.log(data);
        }
        catch(e){
            console.log("problem while getting tasks! ");
        }
        
    },[])
    useEffect(()=>{
        const completedTasks = tasks.filter(task=>task.completed);
        const pendingTasks = tasks.filter(task=> !task.completed);
        updateCompletedTasks(completedTasks);
        updatePendingTasks(pendingTasks);
    },[tasks])

    
    const handleCheckedEvent = async(value,checkedTask)=>{  
        checkedTask.completed=value;    
        const {data} = await updateCheckedTask(checkedTask);
        // console.log(data);
        let newTasks = cloneJsonObject(tasks);
        newTasks = newTasks.map((task)=>{
            if( task.id === data.id) task=data;
            return task;
        })  
        updateTasks(newTasks);
    }
    const handleDateChange = (event)=>{
        console.log(event.target.value)
    }
    const onEditClick=(task)=>{
        toggleModal(!isModalOpen);
        updateEditHeader("Edit Task");
        // console.log("Edit task: ",task);
        updateEditTask(task);

    }
    const addNewTask = ()=>{
        toggleModal(!isModalOpen);
        updateEditHeader("New Task");
        updateEditTask({})        
    }

    return (<>
       <div className="container">
       <select className="form-control select-dropdown" id="exampleFormControlSelect1" onChange={handleDateChange}>
           <option value={getCurrentDate()}>today</option>
           <option value={getTomorrowDate()}>tomorrow</option>
           <option value={getYesterdayDate()}>yesterday</option>
           <option value={{}}>pick a date</option>
       </select>
           <div className="row mt-5">
           <div className="col-lg-6">
               <h5>Pending</h5>
              <div>
                  {(pendingTasks.length<1)? <p>no pending tasks</p>: <TasksList
               tasks={pendingTasks}
               handleCheckedEvent={handleCheckedEvent}
               onEditClick={onEditClick}/>}
              </div>
           </div>
           <div className="col-lg-6">
               <h5>Completed</h5>
               <div>{(completedTasks.length<1)?<p>no completed tasks</p>:<TasksList
               tasks={completedTasks} 
               handleCheckedEvent={handleCheckedEvent}
               onEditClick={onEditClick}/>}</div>
           </div>
           </div>
           {
               (!isModalOpen) &&  
               <div className="floating-add-btn shadow" onClick={addNewTask}> 
                    <i className="fas fa-4x fa-plus"> </i>
               </div>
           }
           
            <Modal
                style={modalOptions}
                closeTimeoutMS={500}
                isOpen={isModalOpen}
                contentLabel="createNewTask">
                <EditTask onComplete={()=>toggleModal(!isModalOpen)} header={editHeader} task={editTask}/>
            </Modal>
       </div>
       </>  );
}
 
export default TaskPage;