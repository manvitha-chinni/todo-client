import React, { Component } from 'react';
import edit26 from '../../images/edit26.png';
import delete26 from '../../images/delete26.png';
class Task extends Component {
    render() { 
        const {task} = this.props;
        return ( 
           <div className="flex-row">
                <div>
                   <input type="checkbox" id={task.title} />
                </div>
                <div style={{width:"50%"}}>
                    <label for={task.title} ><b>{task.title}</b></label>
                    <p>{task.discription}</p>
                </div>
                <div>
                    <i className="fa fa-edit"></i>
                    <i className="far fa-trash-alt"></i>
                    {/* <img src={edit26} style={{padding:"2%"}}  alt="edit"/>
                    <img src={delete26}    alt="delete"/> */}
                </div> 
           </div>
        );
    }
}
 
export default Task;