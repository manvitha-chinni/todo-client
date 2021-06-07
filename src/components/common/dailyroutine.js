import React, { useContext } from 'react';
import ShowMoreText from 'react-show-more-text';
import { deleteItemFromList, getCurrentDate, updateList } from '../../services/helpers';
import { deleteRoutine } from '../../services/routineService';
import { handleCheckedEventContext, onEditClickContext, routinesContext, updateRoutinesContext } from '../dailyroutinesPage';

const Dailyroutine = ({routine,routinesType}) => {

    const   handleCheckedEvent = useContext(handleCheckedEventContext);
    const onEditClick = useContext(onEditClickContext);
    const updateRoutines = useContext(updateRoutinesContext);
    const routines = useContext(routinesContext);
    
    const onDeleteClick = async(id)=>{
        console.log(routine);
        try{
           const {data} = await deleteRoutine(id,{date:getCurrentDate()});
           let a = deleteItemFromList(routines,data);
           console.log(a);
           updateRoutines(a);
        }
        catch(e){}
    }

    return (  <div className="flex-row shadow m-2">
    {routinesType&&<div>
       <input className="cursor-pointer" type="checkbox" id={routine.id}  checked={routine.completed} onChange={(e)=>handleCheckedEvent(e.target.checked,routine)}/>
    </div>}
    <div className="task-content">
        <label className="cursor-pointer" htmlFor={routine.id} ><b className="d-inline">{routine.title}</b> </label>
        <ShowMoreText lines={1}><p>{routine.description}</p></ShowMoreText>
        
    </div>
    <div><p  className="d-inline">{routine.time}</p></div>
    <div className="task-edit shadow">
        <i className="fas fa-pen fa-lg edit-icon"
         onClick={()=>onEditClick(routine)} 
         ></i>
        <br></br>
        <i className="fas fa-minus-square fa-lg delete-icon"
         onClick={()=>onDeleteClick(routine.id)}
         ></i>
    </div> 
</div>  );
}
 
export default Dailyroutine;