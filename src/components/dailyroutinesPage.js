import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import {  getCurrentDate, updateList } from '../services/helpers';
import { getAllRoutines, getTodayRoutines, updateRoutine } from '../services/routineService';
import DailyroutinesList from './common/dailyroutinesList';
import EditDailyroutinue from './common/editDailyroutinue';
import RoutineSkeleton from './common/routineSkeleton';
import TaskSkeleton from './common/taskSkeleton';

export const handleCheckedEventContext = React.createContext();
export const onEditClickContext = React.createContext();
export const routinesContext = React.createContext();
export const updateRoutinesContext = React.createContext();

const DailyroutinesPage = ()=>{
    let loadingArray=[1,2];
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
            width:"65%",
            height:"fit-content"
        }
    }
    const [routines,updateRoutines] = useState([]);
    const [dataLoaded,updateDataLoaded] = useState(false);
    const [completedRoutines,updateCompletedRoutines] = useState([]);
    const [pendingRoutines,updatePendingRoutines] = useState([]);
    const [isModalOpen,toggleModal] = useState(false);
    const [editHeader,updateEditHeader] = useState("");
    const [editRoutine,updateEditRoutine] = useState({});
    const [routinesType,updateRoutinesType] = useState(true); //today

    useEffect(async ()=>{
        try{
            updateDataLoaded(false);
            const {data} =await getTodayRoutines({date:getCurrentDate()});
            updateDataLoaded(true);
            updateRoutines(data);
            console.log(data);
        }
        catch(e){
            console.log("problem while getting routines! ");
        }
        
    },[])

    useEffect(()=>{
        const completedRoutines = routines.filter(routine=>routine.completed);
        const pendingRoutines = routines.filter(routine=> !routine.completed);
        updateCompletedRoutines(completedRoutines);
        updatePendingRoutines(pendingRoutines);
    },[routines])

    const addNewRoutine = ()=>{
        toggleModal(!isModalOpen);  
        updateEditHeader("New Dailyroutine");
        updateEditRoutine({})      
    }
    const onEditClick=(routine)=>{
        toggleModal(!isModalOpen);
        updateEditHeader("Edit Dailyroutine");
        updateEditRoutine(routine);

    }

    const handleCheckedEvent = async (value,checkedRoutine)=>{  
         
        checkedRoutine.completed=value
        const {data} = await updateRoutine(checkedRoutine.id,{updateType:1,date:getCurrentDate()},checkedRoutine);
        const sortedList = updateList(routines,data)
        updateRoutines(sortedList);
    }
    const handleRoutinueChange = async (event)=>{
            let val = parseInt(event.target.value);
            updateRoutinesType(val?true:false);
            updateDataLoaded(false);
            try {
                if(val){
                const {data} = await getTodayRoutines({date:getCurrentDate()});
                updateDataLoaded(true);
                updateRoutines(data);
                }
                else{
                    const{data} = await getAllRoutines();
                    updateDataLoaded(true);
                updateRoutines(data);
                }
            }
            catch(e){}
    }
    
    return (<>
        <routinesContext.Provider value={routines}>
        <updateRoutinesContext.Provider value={updateRoutines}>
         <div className="container">
            <handleCheckedEventContext.Provider value={handleCheckedEvent}>
            <onEditClickContext.Provider value={onEditClick}>
            <div className="row ml-2">
                <div>
                    <select className="form-control select-dropdown mt-2" id="exampleFormControlSelect1" onChange={handleRoutinueChange} >
                    <option value={1} >today</option>
                    <option value={0} >all routines</option>
                </select>
                </div>
            </div>

           {
           !routinesType? 
           <>{
               (dataLoaded)?
               <div className="roe mt-4">
               <div className="col-md-6">
                   <h5>Routines</h5>
                   <div>
                       {
                           (routines.length<1)? 
                           <p>no routines</p>: 
                           <DailyroutinesList
                           routines={routines}
                           routinesType={routinesType}/>
                       }
                   </div>
               </div>      
               </div>:
                <div>
                {
                    loadingArray.map(x=><TaskSkeleton key={x}/>)
                }
                </div>
           }</>:
            <div className="row mt-4">
            <div className="col-md-6">
               <h5>Pending</h5>
               {dataLoaded? <div>
                    {
                        (pendingRoutines.length<1)? 
                        <p>no pending routines</p>: 
                        <DailyroutinesList
                        routines={pendingRoutines}
                        routinesType={routinesType}/>
                    }
              </div>:
               <div>
               {
                   loadingArray.map(x=><RoutineSkeleton key={x}/>)
               }
               </div>
              }
           </div>
           <div className="col-md-6">
               <h5>Completed</h5>
               {dataLoaded? <div>
                   {
                        (completedRoutines.length<1)?
                        <p>no completed routines</p>:
                        <DailyroutinesList
                        routines={completedRoutines} 
                        routinesType={routinesType}/>
                    }
               </div>:
               <div>
               {
                   loadingArray.map(x=><RoutineSkeleton key={x}/>)
               }
               </div>
               }
           </div>
           </div>}  
           
           </onEditClickContext.Provider>
           </handleCheckedEventContext.Provider>
           {
               (!isModalOpen) &&  
               <div className="floating-add-btn shadow" onClick={addNewRoutine} > 
                    <i className="fas fa-4x fa-plus"> </i>
               </div>
           }
            <Modal
                style={modalOptions}
                closeTimeoutMS={500}
                isOpen={isModalOpen}
                contentLabel="createNewRoutine">
                <EditDailyroutinue onComplete={()=>toggleModal(!isModalOpen)} header={editHeader} routine={editRoutine} routinesType={routinesType}/>
            </Modal>
       </div>
       </updateRoutinesContext.Provider>
       </routinesContext.Provider>
    </>);

};
export default DailyroutinesPage;
