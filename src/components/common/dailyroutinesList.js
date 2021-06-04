import React from 'react';
import Dailyroutine from './dailyroutine';
const DailyroutinesList = ({routines,routinesType}) => {
    return (  <div>{routines.map((val,index)=>{
        return <div key={index}>
                <Dailyroutine 
                routine={val} 
                routinesType={routinesType}
                // handleCheckedEvent={handleCheckedEvent}
                // onEditClick={onEditClick}
                />
                </div>
    })}</div> );}
 
export default DailyroutinesList;