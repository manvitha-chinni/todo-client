import React, {useState} from 'react';
import Rodal from 'rodal';
import TasksList from './common/tasksList';
import Modal from 'react-modal';
import NewTask from './newTask';
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
            width:"60%",
            height:"50%"
        }
    }
    const obj = [
        {
            id:0,
            completed:false,
            title: "array problems",
            description: "complete all array problems",
            notify: true,
            time:"10:25 pm",
            date: "24-04-2021"
        },
        {
            id:1,
            completed:false,
            title: "stack problems",
            description: "complete all stack problems",
            notify: true,
            time:"10:25 pm",
            date: "24-04-2021"
        },
        {
            id:2,
            completed:false,
            title: "heap problems",
            description: "complete all queue problems.dfgwfgwyegfiwfgqwiehf d hdfhkgdskffs dfgdsakfgsd kafksadkjfg hsdafsadkyfgshdkftgjksdftgkyuasefg kjsadfg sadfkhgsdfkgsdhfagsadfhg sadfhg dfgshdfghsdgfuyrtghrstgkirtgbralk gsadfhga sdhfg kjasdfsdyf sdfhjskgfksadh gffg sdaf sasjfdas dfasfkasf ygsafkaf avfasdjfa fajkfjA FDSVKJASD GHFKDASFHASDF bhcgvdjfsd hvhksdfgsadfsad dfjhsdvfsadvhvdsafhjVFJfv",
            notify: true,
            time:"10:25 am",
            date: "24-04-2022"
        },
        {
            id:3,
            completed:false,
            title: "queue problems",
            description: "complete all queue problems.dfgwfgwyegfiwfgqwiehf dsasjfdas dfasfkasf ygsafkaf avfasdjfa fajkfjA FDSVKJASD GHFKDASFHASDF bhcgvdjfsd hvhksdfgsadfsad dfjhsdvfsadvhvdsafhjVFJfv",
            notify: true,
            time:"00:25 am",
            date: "24-12-2021"
        }
    ]
    const [tasks,updateTasks] = useState(obj);

    const filterCompletedTasks = (newTasks) =>{ 
        return newTasks.filter(task=> task.completed);
    };
    const filterPendingTasks = (newTasks) => {
        return newTasks.filter(task=> !task.completed);
    };

    const [completedTasks,updateCompletedTasks] = useState(filterCompletedTasks(tasks));
    const [pendingTasks,updatePendingTasks] = useState(filterPendingTasks(tasks));
    const [isModalOpen,toggleModal] = useState(false);
    
    const HandleChangeEvent = (value,id)=>{
        let newTasks = [...tasks]
        newTasks = newTasks.map((task)=>{
            if( task.id === id) task.completed=value;
            return task;
        })        
        updateTasks(newTasks);
        let a = filterCompletedTasks(newTasks);
        updateCompletedTasks(a);
        let b = filterPendingTasks(newTasks);
        updatePendingTasks(b);
        // console.log("tasks",tasks,"completed",completedTasks,"pending",pendingTasks);
    }
    

    return (<>
        
       <div className="container">
       <select className="form-control select-dropdown" id="exampleFormControlSelect1">
           <option>today</option>
           <option>tomorrow</option>
           <option>yesterday</option>
           <option>pick a date</option>
       </select>
           <div className="row mt-5">
           <div className="col-lg-6">
               <h5>Pending</h5>
               <TasksList
               tasks={pendingTasks}
               HandleChangeEvent={HandleChangeEvent}/>
           </div>
           <div className="col-lg-6">
               <h5>Completed</h5>
               <TasksList
               tasks={completedTasks} 
               HandleChangeEvent={HandleChangeEvent}/>
           </div>
           </div>
           {
               (!isModalOpen) &&  
               <div className="floating-add-btn shadow" onClick={()=>{toggleModal(!isModalOpen)}}> 
                    <i className="fas fa-4x fa-plus"> </i>
               </div>
           }
           
            <Modal
                style={modalOptions}
                closeTimeoutMS={500}
                isOpen={isModalOpen}
                contentLabel="createNewTask">
                <div>Create New Task <i class="far fa-times-circle float-right fa-lg cursor-pointer mt-1" onClick={()=>{toggleModal(!isModalOpen)}}></i> </div>
                <NewTask/>
            </Modal>
       </div>
       </>  );
}
 
export default TaskPage;