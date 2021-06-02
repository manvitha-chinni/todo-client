import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_BACKEND_ROOT_URL + "/routines";

export function getTodayRoutines(params){
    const url = http.addQueryParams(apiEndpoint+"/today",params);
    return http.get(url);
}

export function getAllRoutines(){
    return http.get(apiEndpoint+"/all");
}

export function createRoutine(routine){
    return http.post(apiEndpoint,routine);
}
export function updateRoutine(id,params,body){
    const url = http.addQueryParams(apiEndpoint+"/"+id,params);
    return http.put(url,body);
}
export function deleteRoutine(id,params){
    const url = http.addQueryParams(apiEndpoint+"/"+id,params);
    return http.delete(url);
}

