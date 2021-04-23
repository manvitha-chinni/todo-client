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
            completed:true,
            title: "stack problems",
            discription: "complete all stack problems",
            notify: true,
            time:"10:25 pm",
            date: "24-04-2021"
        },
        {
            completed:true,
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
        // return ( <div>{this.state.tasks.map((val,index)=>{

        //     return <h6 key={index}> {val.title}</h6>;
        // })}</div>) ;
        return (
            <TasksList
            tasks={this.state.tasks}
            >
            </TasksList>
        )
    }
}
 
export default TaskPage;