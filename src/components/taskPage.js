import React, {useState} from 'react';
import TasksList from './common/tasksList';
import Modal from 'react-modal';
Modal.setAppElement("#root");


const TaskPage = () => {

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
            <div className="floating-add-btn" onClick={()=>{toggleModal(!isModalOpen)}}> 
                <i className="fas fa-4x fa-plus"> </i>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={()=>{toggleModal(!isModalOpen)}}
                contentLabel="My dialog"
            >
                <div>My modal dialog.</div>
                <div className="btn btn-warning" onClick={()=>{toggleModal(!isModalOpen)}}>Close modal</div>
            </Modal>
       </div>
       </>  );
}
 
export default TaskPage;