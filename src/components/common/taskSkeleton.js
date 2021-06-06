import React from 'react';
const TaskSkeleton = () => {
    return ( 
        <div 
            className="task-skeleton shadow m-2">
            <div className="task-chkbox-skeleton loading">
            </div>
            <div className="task-content-skeleton">
                <div className="task-title-skeleton loading"></div>
                <div className="task-desc-skeleton loading"></div>
            </div>
        </div>
     );
}
 
export default TaskSkeleton;
