import React, { Component } from 'react';
import TasksList from './common/tasksList'

class TaskPage extends Component {
    tasks = [
        {
            completed:true,
            title: "array problems",
            discription: "complete all array problems",
            notify: true,
            time:"10:25 pm",
            date: "24-04-2021"
        },
        {
            completed:false,
            title: "stack problems",
            discription: "complete all stack problems",
            notify: true,
            time:"10:25 pm",
            date: "24-04-2021"
        },
        {
            completed:false,
            title: "heap problems",
            discription: "complete all queue problems.dfgwfgwyegfiwfgqwiehf d hdfhkgdskffs dfgdsakfgsd kafksadkjfg hsdafsadkyfgshdkftgjksdftgkyuasefg kjsadfg sadfkhgsdfkgsdhfagsadfhg sadfhg dfgshdfghsdgfuyrtghrstgkirtgbralk gsadfhga sdhfg kjasdfsdyf sdfhjskgfksadh gffg sdaf sasjfdas dfasfkasf ygsafkaf avfasdjfa fajkfjA FDSVKJASD GHFKDASFHASDF bhcgvdjfsd hvhksdfgsadfsad dfjhsdvfsadvhvdsafhjVFJfv",
            notify: true,
            time:"10:25 am",
            date: "24-04-2022"
        },
        {
            completed:true,
            title: "queue problems",
            discription: "complete all queue problems.dfgwfgwyegfiwfgqwiehf dsasjfdas dfasfkasf ygsafkaf avfasdjfa fajkfjA FDSVKJASD GHFKDASFHASDF bhcgvdjfsd hvhksdfgsadfsad dfjhsdvfsadvhvdsafhjVFJfv",
            notify: true,
            time:"00:25 am",
            date: "24-12-2021"
        }
    ]
    state = { tasks:this.tasks }
    render() { 
        let completedTasks = this.state.tasks.filter((task)=>task.completed);
        let pendingTasks = this.state.tasks.filter((task)=> !task.completed); 
        
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
                    tasks={pendingTasks}></TasksList>
                </div>
                <div className="col-lg-6">
                    <h5>Completed</h5>
                    <TasksList
                    tasks={completedTasks}></TasksList>
                </div>
                </div>
            </div>
            </>
        )
    }
}
 
export default TaskPage;