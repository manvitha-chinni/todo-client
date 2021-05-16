import http from "./httpService";
// import { apiUrl } from "../config.json";
import axios from "axios";

// http.setJwt()
const apiEndpoint = process.env.REACT_APP_BACKEND_ROOT_URL + "/tasks";


export function getTasks(params) {
    const url = http.addQueryParams(apiEndpoint,params)
  return http.get(url);
} 
export function getTaskById( id) {
    return http.get(apiEndpoint+'/'+id);
}   
export function editTaskById( id) {
    return http.get(apiEndpoint+'/edit/'+id);
}   
export function createTask(task){
    return http.post(apiEndpoint,task);
}
export function updateTask(task,id){
    return http.put(apiEndpoint+'/'+id,task);
}
export function deleteTask(id){
    return http.delete(apiEndpoint+'/'+id,);
}