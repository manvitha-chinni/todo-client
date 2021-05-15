import React, {useState} from 'react';
import TasksList from './common/tasksList'

const TaskPage = () => {

    const obj = [
        {
            id:0,
            completed:false,
            title: "array problems",
            discription: "complete all array problems",
            notify: true,
            time:"10:25 pm",
            date: "24-04-2021"
        },
        {
            id:1,
            completed:false,
            title: "stack problems",
            discription: "complete all stack problems",
            notify: true,
            time:"10:25 pm",
            date: "24-04-2021"
        },
        {
            id:2,
            completed:false,
            title: "heap problems",
            discription: "complete all queue problems.dfgwfgwyegfiwfgqwiehf d hdfhkgdskffs dfgdsakfgsd kafksadkjfg hsdafsadkyfgshdkftgjksdftgkyuasefg kjsadfg sadfkhgsdfkgsdhfagsadfhg sadfhg dfgshdfghsdgfuyrtghrstgkirtgbralk gsadfhga sdhfg kjasdfsdyf sdfhjskgfksadh gffg sdaf sasjfdas dfasfkasf ygsafkaf avfasdjfa fajkfjA FDSVKJASD GHFKDASFHASDF bhcgvdjfsd hvhksdfgsadfsad dfjhsdvfsadvhvdsafhjVFJfv",
            notify: true,
            time:"10:25 am",
            date: "24-04-2022"
        },
        {
            id:3,
            completed:false,
            title: "queue problems",
            discription: "complete all queue problems.dfgwfgwyegfiwfgqwiehf dsasjfdas dfasfkasf ygsafkaf avfasdjfa fajkfjA FDSVKJASD GHFKDASFHASDF bhcgvdjfsd hvhksdfgsadfsad dfjhsdvfsadvhvdsafhjVFJfv",
            notify: true,
            time:"00:25 am",
            date: "24-12-2021"
        }
    ]
    const [tasks,changeState] = useState(obj);

    const filterCompletedTasks = () => tasks.filter((task)=>task.completed);
    const filterPendingTasks = () => tasks.filter((task)=> !task.completed);

    const [completedTasks,changeStateCompletedTasks] = useState(filterCompletedTasks());
    const [pendingTasks,changePendingTasks] = useState(filterPendingTasks());
    
    const HandleChangeEvent = (event)=>{
        tasks.map((task)=>{
            if( task.id == event.target.id) task.completed=event.target.checked;
        })        
        changeState(tasks);
        let a = filterCompletedTasks(tasks);
        changeStateCompletedTasks(a);
        let b = filterPendingTasks(tasks);
        changePendingTasks(b);
        console.log("tasks",tasks,"completed",completedTasks,"pending",pendingTasks);
    }
    

    return (<>
        <select class="form-control select-dropdown" id="exampleFormControlSelect1">
           <option>today</option>
           <option>tomorrow</option>
           <option>yesterday</option>
           <option>pick a date</option>
       </select>
       <div className="container">
           <div className="row">
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
       </div>
       </>  );
}
 
export default TaskPage;