import React, { useContext, useState } from 'react';
import { addItemToList, cloneJsonObject, getCurrentDate, updateList } from '../../services/helpers';
import {Multiselect} from 'multiselect-react-dropdown';
import { createRoutine, getAllRoutines, getTodayRoutines, updateRoutine } from '../../services/routineService';
import { routinesContext, updateRoutinesContext } from '../dailyroutinesPage';
const EditDailyroutinue = (props) => {
    const {header,routine:existingRoutine,onComplete,routinesType} =props;
    const updateRoutines = useContext(updateRoutinesContext);
    const routines = useContext(routinesContext);
    const defaultData ={};
    
    defaultData.title=existingRoutine.title || "";
    defaultData.description=existingRoutine.description || "";
    defaultData.notify=existingRoutine.notify || false;
    defaultData.repeat=existingRoutine.repeat || {type:1,value:[1]};
    defaultData.time=existingRoutine.time || "";

    const getNumbers=()=>{
        let arr=[];
        for(let i=1;i<=31;i++){
            arr.push(i);
        }
        return arr;
    }
    let daysArray = [
        {label:"Monday",value:1},
        {label:"Tuesday",value:2},
        {label:"Wednesday",value:3},
        {label:"Thursday",value:4},
        {label:"Friday",value:5},
        {label:"Saturday",value:6},
        {label:"Sunday",value:0}]
    const [routine,updateEditRoutine] = useState(defaultData);
    const [days,updateDays] = useState(daysArray);
    const [dates,updateDates] = useState(getNumbers());
    // const [isMultiselectVisible,toggleMultiselect] = useState(false);

   
    const onTitleChange = (event)=>{
        const title = event.target.value;
        updateEditRoutine({...routine,title});

    }
    const onRepeatChange = (event)=>{
        const repeatType = parseInt(event.target.value);
        let repeat = {};
        repeat.type=repeatType
        if(repeatType!=1){
            repeat.value=[];
        }
        updateEditRoutine({...routine,repeat});

    }
    const getSelectedDays = (arr)=>{
        const selectedDays = days.filter(item=>{
            return arr.includes(item.value,0);
        })
        return selectedDays;
    }
    const onSelectOrRemoveDays= (selectedList,item)=>{
        let selectedDays = [];
        selectedList.map((day)=>{
            selectedDays.push(day.value);
        });
        let repeat = routine.repeat;
        repeat.value=selectedDays;
        updateEditRoutine({...routine,repeat});
        console.log(routine);
    }
    const onSelectOrRemoveDates = (selectedList,item)=>{
        // console.log("selectedList",selectedList,"item",item);
        const repeat = routine.repeat;
        repeat.value=selectedList;
        updateEditRoutine({...routine,repeat});
    }
    const onTimeChange = (event)=>{
        const time = event.target.value;
        updateEditRoutine({...routine,time});
    }
    const onDescriptionChange = (event)=>{
        const description = event.target.value;
        updateEditRoutine({...routine,description});
    }
    const onNotifyChange = (event)=>{
        const notify = event.target.checked;
        updateEditRoutine({...routine,notify})
    }
    const onCancel=()=>{
        onComplete();
    }
    const onSave = async ()=>{
        let data;
        try{
            
            if(header==="New Dailyroutine"){
                await createRoutine(routine);
            }else{
                await updateRoutine(existingRoutine.id,{updateType:2,date:getCurrentDate()},routine);
            }
            const {data} = routinesType?await getTodayRoutines({date:getCurrentDate()}):await getAllRoutines();
            updateRoutines(data);
            onComplete(); 
        }
        catch(e){console.log("something went worng while save task! ")}
    }
    return ( 
    <>
        <h5 className="text-primary">{header}</h5>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" value={routine.title} onChange={onTitleChange} placeholder="Enter title"></input>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 form-group"> 
                    <label htmlFor="selectRepeat">Repeat</label>
                    {/* <input type="date" className="form-control" value={task.date} onChange={onDateChange} id="selectDate"/> */}
                    <select className="form-control  mt-2" id="selectRepeat" onChange={onRepeatChange}>
                        <option value={1} selected ={routine.repeat.type===1}>daily</option>
                        <option value={2} selected ={routine.repeat.type===2}>weekly</option>
                        <option value={3} selected ={routine.repeat.type===3}>monthly</option>
                        {/* <option value="custom-date">pick a date</option> */}
                    </select>
                </div>
                {routine.repeat.type===2 && <div className="col-12 col-md-6 form-group">
                <label htmlFor="selectDay">Select Days</label>
                    <Multiselect
                        id="selectDay"
                        options={days}
                        displayValue="label"
                        selectedValues={getSelectedDays(routine.repeat.value)}
                        onSelect={onSelectOrRemoveDays}
                        onRemove={onSelectOrRemoveDays}
                    />
                </div>}
                {routine.repeat.type===3 && <div className="col-12 col-md-6 form-group">
                <label htmlFor="selectDay">Select Dates</label>
                    <Multiselect
                        id="selectDay"
                        options={dates}
                        isObject={false}
                        selectedValues={routine.repeat.value}
                        onSelect={onSelectOrRemoveDates}
                        onRemove={onSelectOrRemoveDates}
                    />
                </div>}
                <div className="col-12 col-md-6 form-group">
                    <label htmlFor="selectTime">Time</label>
                    <input type="time" className="form-control" value={routine.time} onChange={onTimeChange} id="selectTime"/>
                </div>
                
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" value={routine.description} onChange={onDescriptionChange} rows="3"></textarea>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="notify" checked={routine.notify} onChange={onNotifyChange}></input>
                <label className="form-check-label" htmlFor="notify">Notify</label>
            </div>
            <br></br>
            <div  className="btn btn-primary float-right ml-3" onClick={onSave}>Save</div>
            <div  className="btn btn-warning float-right" onClick={onCancel}>Cancel</div>
    </>
     );
}
 
export default EditDailyroutinue;