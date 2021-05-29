import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import { cloneJsonObject } from '../services/helpers';
import DailyroutinesList from './common/dailyroutinesList';
import EditDailyroutinue from './common/editDailyroutinue';

export const handleCheckedEventContext = React.createContext();
export const onEditClickContext = React.createContext();

const DailyroutinesPage = ()=>{
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

    const data = [
        {
            id:1,
            completed:true,
            title:"hello",
            description:"hello everyone ok ok",
            notify:true,
            repeat:{
                type:1,
                value:-1
            },
            time:"23:20"
        },
        {
            id:2,
            completed:true,
            title:"new movie",
            description:"watch a new movie, do it",
            notify:true,
            repeat:{
                type:2,
                value:["Saturday","Sunday"]
            },
            time:"23:20"
        },
        {
            id:3,
            completed:false,
            title:"learn abcd",
            description:"A B C D E F G H I G K L M N O P Q R S T U V W X Y Z",
            notify:true,
            repeat:{
                type:3,
                value:[11,23]
            },
            time:"23:20"
        },
        {
            id:4,
            completed:false,
            title:"do home work",
            description:"complete maths problems.read 3rd lesson in subject scienceignore social, I can learn social in my future life.",
            notify:true,
            repeat:{
                type:2,
                value:["Monday","Sunday"]
            },
            time:"23:20"
        }
    ]
    const [tasks,updateTasks] = useState(data);
    const [completedTasks,updateCompletedTasks] = useState([]);
    const [pendingTasks,updatePendingTasks] = useState([]);
    const [isModalOpen,toggleModal] = useState(false);
    const [editHeader,updateEditHeader] = useState("");
    const [editTask,updateEditTask] = useState({});

    useEffect(()=>{
        const completedTasks = tasks.filter(task=>task.completed);
        const pendingTasks = tasks.filter(task=> !task.completed);
        updateCompletedTasks(completedTasks);
        updatePendingTasks(pendingTasks);
    },[tasks])

    const addNewTask = ()=>{
        toggleModal(!isModalOpen);  
        updateEditHeader("New Dailyroutine");
        updateEditTask({})      
    }
    const onEditClick=(task)=>{
        toggleModal(!isModalOpen);
        updateEditHeader("Edit Dailyroutine");
        // console.log("Edit task: ",task);
        updateEditTask(task);

    }

    const handleCheckedEvent = (value,checkedTask)=>{  
        // checkedTask.completed=value;    
        // const {data} = await updateCheckedTask(checkedTask);
        // console.log(data);
        let newTasks = cloneJsonObject(tasks);
        newTasks = newTasks.map((task)=>{
            if( task.id === checkedTask.id) task.completed=value;
            return task;
        })  
        // const sortedTasks = sortArrayByTime(newTasks)
        updateTasks(newTasks);
    }
    
    return (<>
         <div className="container">
             <handleCheckedEventContext.Provider value={handleCheckedEvent}>
                 <onEditClickContext.Provider value={onEditClick}>
           <div className="row mt-4">
           <div className="col-md-6">
               <h5>Pending</h5>
               <div>
                  {(pendingTasks.length<1)? <p>no pending tasks</p>: <DailyroutinesList
               tasks={pendingTasks}
            //    handleCheckedEvent={handleCheckedEvent}
            //    onEditClick={onEditClick}
               />}
              </div>
           </div>
           <div className="col-md-6">
               <h5>Completed</h5>
               <div>{(completedTasks.length<1)?<p>no completed tasks</p>:<DailyroutinesList
               tasks={completedTasks} 
            //    handleCheckedEvent={handleCheckedEvent}
            //    onEditClick={onEditClick}
               />}</div>
           </div>
           </div>
           </onEditClickContext.Provider>
           </handleCheckedEventContext.Provider>
           {
               (!isModalOpen) &&  
               <div className="floating-add-btn shadow" onClick={addNewTask} > 
                    <i className="fas fa-4x fa-plus"> </i>
               </div>
           }
            <Modal
                style={modalOptions}
                closeTimeoutMS={500}
                isOpen={isModalOpen}
                contentLabel="createNewTask">
                <EditDailyroutinue onComplete={()=>toggleModal(!isModalOpen)} header={editHeader} task={editTask} />
            </Modal>
       </div>
    </>);
};
export default DailyroutinesPage;
