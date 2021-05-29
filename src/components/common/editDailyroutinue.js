import React, { useState } from 'react';
import { getCurrentDate } from '../../services/helpers';
import {Multiselect} from 'multiselect-react-dropdown';
const EditDailyroutinue = (props) => {
    const {header,task:existingTask,onComplete} =props;
    const defaultData ={};
    
    defaultData.title=existingTask.title || "";
    defaultData.description=existingTask.description || "";
    defaultData.notify=existingTask.notify || false;
    defaultData.repeat=existingTask.repeat || {type:1,value:-1};
    defaultData.time=existingTask.time || "";

    const getNumbers=()=>{
        let arr=[];
        for(let i=1;i<=31;i++){
            arr.push(i);
        }
        return arr;
    }
    const [task,updateEditTask] = useState(defaultData);
    const [days,updateDays] = useState(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]);
    const [dates,updateDates] = useState(getNumbers());
    // const [isMultiselectVisible,toggleMultiselect] = useState(false);

   
    const onTitleChange = (event)=>{
        const title = event.target.value;
        updateEditTask({...task,title});

    }
    const onRepeatChange = (event)=>{
        const repeatType = event.target.value;
        let repeat = {};
        repeat.type=repeatType
        if(repeatType!=1){
            repeat.value=[];
        }
        updateEditTask({...task,repeat});

    }
    const onSelectOrRemove = (selectedList,item)=>{
        const repeat = task.repeat;
        repeat.value=selectedList;
        updateEditTask({...task,repeat});
    }
    const onTimeChange = (event)=>{
        const time = event.target.value;
        updateEditTask({...task,time});
    }
    const onDescriptionChange = (event)=>{
        const description = event.target.value;
        updateEditTask({...task,description});
    }
    const onNotifyChange = (event)=>{
        const notify = event.target.checked;
        updateEditTask({...task,notify})
    }
    const onCancel=()=>{
        onComplete();
    }
    const onSave = async ()=>{
        // try{
        //     if(header==="New Task"){
        //         await createTask(task);
        //     }else{
        //         await updateTask(task,existingTask.id);
        //     }
        //     console.log(JSON.stringify(task));
        //     window.location.href = "tasks/"
        // }
        // catch(e){console.log("something went worng while save task! ")}
    }
    return ( 
    <>
        <h5 className="text-primary">{header}</h5>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" value={task.title} onChange={onTitleChange} placeholder="Enter title"></input>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 form-group"> 
                    <label htmlFor="selectRepeat">Repeat</label>
                    {/* <input type="date" className="form-control" value={task.date} onChange={onDateChange} id="selectDate"/> */}
                    <select className="form-control  mt-2" id="selectRepeat" onChange={onRepeatChange}>
                        <option value={1} selected ={task.repeat.type==1}>daily</option>
                        <option value={2} selected ={task.repeat.type==2}>weekly</option>
                        <option value={3} selected ={task.repeat.type==3}>monthly</option>
                        {/* <option value="custom-date">pick a date</option> */}
                    </select>
                </div>
                {task.repeat.type==2 && <div className="col-12 col-md-6 form-group">
                <label htmlFor="selectDay">Select Days</label>
                    <Multiselect
                        id="selectDay"
                        options={days}
                        isObject={false}
                        selectedValues={task.repeat.value}
                        onSelect={onSelectOrRemove}
                        onRemove={onSelectOrRemove}
                    />
                </div>}
                {task.repeat.type==3 && <div className="col-12 col-md-6 form-group">
                <label htmlFor="selectDay">Select Dates</label>
                    <Multiselect
                        id="selectDay"
                        options={dates}
                        isObject={false}
                        selectedValues={task.repeat.value}
                        onSelect={onSelectOrRemove}
                        onRemove={onSelectOrRemove}
                    />
                </div>}
                <div className="col-12 col-md-6 form-group">
                    <label htmlFor="selectTime">Time</label>
                    <input type="time" className="form-control" value={task.time} onChange={onTimeChange} id="selectTime"/>
                </div>
                
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" value={task.description} onChange={onDescriptionChange} rows="3"></textarea>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="notify" checked={task.notify} onChange={onNotifyChange}></input>
                <label className="form-check-label" htmlFor="notify">Notify</label>
            </div>
            <br></br>
            <div  className="btn btn-primary float-right ml-3" onClick={onSave}>Save</div>
            <div  className="btn btn-warning float-right" onClick={onCancel}>Cancel</div>
    </>
     );
}
 
export default EditDailyroutinue;