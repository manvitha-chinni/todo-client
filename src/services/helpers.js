


//date helpers
export function changeDateFormat(date){
    return date.toJSON().slice(0,10).replace(/-/g,'-');
}
export function getTomorrowDate(){
    let dateObj= new Date();
    dateObj.setDate(dateObj.getDate()+1);
    return changeDateFormat(dateObj);
}
export function getYesterdayDate(){
    let dateObj= new Date();
    dateObj.setDate(dateObj.getDate()-1);
    return changeDateFormat(dateObj);
}
export function getCurrentDate(){
    let dateObj= new Date();
    return changeDateFormat(dateObj);
}
// object helpers
export function cloneJsonObject(list){
    return JSON.parse(JSON.stringify(list));
} 
export function getMonthDates(){
    const months=[31,28,31,30,31,30,31,31,30,31,30,31];
    const monthType = (new Date()).getMonth();
    const year =  (new Date()).getFullYear();
    if((year%400==0) || (year%4==0 && year%100!=0)){
        months[1] = 29;
    }

    const arr = [];
    for(let i=1;i<=months[monthType];i++){
        arr.push(i);
    }
    return arr;

}
//state helpers
export function updateList(tasks,updatedTask){
    let newTasks = cloneJsonObject(tasks);
        newTasks = newTasks.map((task)=>{
            if( task.id === updatedTask.id) task=updatedTask;
            return task;
        }) 
    return newTasks
}
export function deleteItemFromList(tasks,delTask){
    let newTasks = cloneJsonObject(tasks);
    let index ;
    newTasks.map((task,ind)=>{
        if( task.id === delTask.id) index= ind;
        return task;
    }) 
    newTasks.splice(index,1);
    return newTasks;

}