import React from 'react';
const RoutineSkeleton = () => {
    return ( 
        <div 
            className="routine-skeleton shadow m-2">
            <div className="routine-chkbox-skeleton loading">
            </div>
            <div className="routine-content-skeleton">
                <div className="routine-title-skeleton loading"></div>
                <div className="routine-desc-skeleton loading"></div>
            </div>
        </div>
     );
}
 
export default RoutineSkeleton;
