
export function cloneJsonObject(list){
    return JSON.parse(JSON.stringify(list));
} 
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
export function isEmptyObj(obj){
    return (JSON.stringify(obj)===JSON.stringify({}));
}