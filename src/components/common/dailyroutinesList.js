import React from 'react';
import Dailyroutine from './dailyroutine';
const DailyroutinesList = ({tasks}) => {
    return (  <div>{tasks.map((val,index)=>{
        return <div key={index}>
                <Dailyroutine 
                task={val} 
                // handleCheckedEvent={handleCheckedEvent}
                // onEditClick={onEditClick}
                />
                </div>
    })}</div> );}
 
export default DailyroutinesList;