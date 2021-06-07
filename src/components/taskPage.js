
import React, {useState,useEffect} from 'react';
import TasksList from './common/tasksList';
import Modal from 'react-modal';
import EditTask from './common/editTask';
import { getAllTasks, getTasks,updateCheckedTask } from '../services/taskService';
import { getCurrentDate, getTomorrowDate, getYesterdayDate, updateList } from '../services/helpers';
import TaskSkeleton from './common/taskSkeleton';

Modal.setAppElement("#root");

export const tasksContext = React.createContext()
export const updateTasksContext = React.createContext();


let loadingArray=[1,2,3];
// let dataLoaded = false;
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
    const [dataLoaded,updateDataLoaded] = useState(false);
    const [isDatePickerVisible,toggleDatePicker] = useState(false);
    const [completedTasks,updateCompletedTasks] = useState([]);
    const [pendingTasks,updatePendingTasks] = useState([]);
    const [isModalOpen,toggleModal] = useState(false);
    const [editHeader,updateEditHeader] = useState("");
    const [editTask,updateEditTask] = useState({});
    const [date, updateDate] = useState(getCurrentDate());
    const [allTasks,toggleAllTasks] = useState(false); 

    useEffect(async ()=>{
        try{
            updateDataLoaded(false);
            const {data} =await getTasks({date});
            updateDataLoaded(true);
            updateTasks(data);
            console.log(data);
        }
        catch(e){
            console.log("problem while getting tasks! ");
        }
        
    },[date])
    useEffect(()=>{
        const completedTasks = tasks.filter(task=>task.completed);
        const pendingTasks = tasks.filter(task=> !task.completed);
        updateCompletedTasks(completedTasks);
        updatePendingTasks(pendingTasks);
    },[tasks])
    const handleCheckedEvent = async(value,checkedTask)=>{  
        checkedTask.completed=value;    
        const {data} = await updateCheckedTask(checkedTask); 
        const sortedTasks =updateList(tasks,data);
        updateTasks(sortedTasks);
    }
    const handleDateChange = (event)=>{
        const date = event.target.value;
        toggleAllTasks(false);
        if(date === 'custom-date')
        {
            toggleDatePicker(true);
        }
        else if(date ==='all'){
            toggleAllTasks(true);
            updateDate(date);
        }
        else{
            toggleDatePicker(false);
            updateDate(date);
        }
    }
    const handleDatePicked = (event)=>{
        const date = event.target.value;
        updateDate(date);
    }
    const onEditClick=(task)=>{
        toggleModal(!isModalOpen);
        updateEditHeader("Edit Task");
        updateEditTask(task);

    }
    const addNewTask = ()=>{
        toggleModal(!isModalOpen);
        updateEditHeader("New Task");
        updateEditTask({})        
    }

    return (<>
    <tasksContext.Provider value={tasks}>
        <updateTasksContext.Provider value={updateTasks}>
       <div className="container">
       <div className="row ml-2">
            <div>
                <select className="form-control select-dropdown mt-2 mr-2" id="exampleFormControlSelect1" onChange={handleDateChange}>
                <option value={getCurrentDate()}>today</option>
                <option value={getTomorrowDate()}>tomorrow</option>
                <option value={getYesterdayDate()}>yesterday</option>
                <option value="custom-date">pick a date</option>
                <option value="all">all Tasks</option>
            </select>
            </div>
            {
                isDatePickerVisible && <div className="col-12 col-md-6 form-group mt-2 p-0 mb-0"> 
                            <input type="date" className="form-control" style={{width:"auto"}} value={date} onChange={handleDatePicked} id="selectDate"/>
                        </div>
            }
       </div>
       {
        allTasks?
        <div className="row mt-4">
            <div className="col-md-6">
                <h5>Tasks</h5>
                {
                     (dataLoaded) ?
                        <div>
                            {(tasks.length<1)? <p>no tasks</p>: <TasksList
                            tasks={tasks}
                            handleCheckedEvent={handleCheckedEvent}
                            onEditClick={onEditClick}/>}
                        </div>
                            :
                         <div>
                         {
                             loadingArray.map(x=><TaskSkeleton key={x}/>)
                         }
                         </div>
                }
            </div>
        </div>
        :
        <div className="row mt-4">
            <div className="col-md-6">
                <h5>Pending</h5>
                <div>
                    {
                        (dataLoaded) ?
                        <>
                        {
                            (pendingTasks.length<1) ?
                            <p>no pending tasks</p> : 
                            <TasksList
                            tasks={pendingTasks}
                            handleCheckedEvent={handleCheckedEvent}
                            onEditClick={onEditClick}/>
                        }
                        </> :
                            <div>
                            {
                                loadingArray.map(x=><TaskSkeleton key={x}/>)
                            }
                            </div>
                    }
                </div>
            </div>
            <div className="col-md-6">
                <h5>Completed</h5>
                <div>
                    {
                        (dataLoaded) ?
                        <>
                        {
                           (completedTasks.length<1) ?
                           <p>no completed tasks</p> :
                           <TasksList
                               tasks={completedTasks} 
                        tasks={completedTasks} 
                               tasks={completedTasks} 
                        tasks={completedTasks} 
                               tasks={completedTasks} 
                           tasks={completedTasks} 
                               tasks={completedTasks} 
                           tasks={completedTasks} 
                               tasks={completedTasks} 
                           tasks={completedTasks} 
                               tasks={completedTasks} 
                               handleCheckedEvent={handleCheckedEvent}
                               onEditClick={onEditClick}/>
                        }
                        </> :
                            <div>
                            {
                                loadingArray.map(x=><TaskSkeleton key={x}/>)
                            }
                            </div>
                    }
                </div>
            </div>
        </div>
        }
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
            <EditTask onComplete={()=>toggleModal(!isModalOpen)} header={editHeader} task={editTask} date={date} tasksType={allTasks}/>
        </Modal>
       </div>
       </updateTasksContext.Provider>
    </tasksContext.Provider>
       </>  );
}
 
export default TaskPage;