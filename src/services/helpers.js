


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
export function sortArrayByTime(arr){
 let newArr =  arr.sort((a,b)=>{
     if(a.time<b.time) return -1;
     return 0;
 })
 return (sortArrayByCompleted(newArr))
}
export function sortArrayByCompleted(arr){
    return arr.sort((a,b)=>{
        if(a.completed<b.completed) return -1;
        return 0;
    })
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