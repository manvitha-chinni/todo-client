import React, { Component } from 'react';
import ShowMoreText from 'react-show-more-text';

class Task extends Component {
    render() { 
        const {task} = this.props;
        return ( 
           <div className="flex-row">
                <div>
                   <input type="checkbox" id={task.title} checked={task.completed}/>
                </div>
                <div className="content">
                    <label for={task.title} ><b>{task.title}</b></label>
                    <ShowMoreText lines={1}><p>{task.discription}</p></ShowMoreText>
                    
                </div>
                <div className="edit">
                    <i className="fas fa-pen fa-lg edit-icon icons"  ></i>
                    <br></br>
                    <i className="fas fa-minus-square fa-lg delete-icon icons"></i>
                </div> 
           </div>
        );
    }
}
 
export default Task;