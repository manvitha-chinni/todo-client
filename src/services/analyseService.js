import http from "./httpService";
// import {cloneJsonObject} from './helpers';

// http.setJwt()
const apiEndpoint = process.env.REACT_APP_BACKEND_ROOT_URL + "/analyse";

export function getTasksWeeklyAnalysis(){
    const url = http.addQueryParams(apiEndpoint+"/tasks",{type:1});
    return http.get(url);
}

export function getTasksMonthlyAnalysis(){
    const url = http.addQueryParams(apiEndpoint+"/tasks",{type:2});
    return http.get(url);
}

export function getRoutinesWeeklyAnalysis(){
    const url = http.addQueryParams(apiEndpoint+"/routines",{type:1});
    return http.get(url);
}

export function getRoutinesMonthlyAnalysis(){
    const url = http.addQueryParams(apiEndpoint+"/routines",{type:2});
    return http.get(url);
}