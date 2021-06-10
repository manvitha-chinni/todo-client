let isSubscribed = false;
let swRegistration = null;
let applicationKey = "BEWcuL0WB_1jt-irQz3jK1zW5axENq5xITbEj6Bk5xSA21wijy9_KtBU94rYOmXB_syMhJVWXEvDg9DoG8HF5n8";

let myName ="yuvatheja";
window.myVariables = {myName};
// Url Encription
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Installing service worker
// const installServiceWorker =async function(createSubscriptionCallBack){
//     if ('serviceWorker' in navigator && 'PushManager' in window) {
//         console.log('Service Worker and Push is supported');
    
//         navigator.serviceWorker.register('sw.js')
//             .then(function (swReg) {
//                 console.log('service worker registered');
    
//                 swRegistration = swReg;
    
//                 swRegistration.pushManager.getSubscription()
//                     .then(function (subscription) {
//                         console.log('subscription is',JSON.stringify(subscription));
//                         isSubscribed = !(subscription === null);
    
//                         if (isSubscribed) {
//                             console.log('User is subscribed');
//                         } else {
//                             swRegistration.pushManager.subscribe({
//                                     userVisibleOnly: true,
//                                     applicationServerKey: urlB64ToUint8Array(applicationKey)
//                                 })
//                                 .then(function (subscription) {
//                                     console.log(subscription);
//                                     console.log('User is subscribed');
    
//                                     createSubscriptionCallBack(subscription);
    
//                                     isSubscribed = true;
//                                 })
//                                 .catch(function (err) {
//                                     console.log('Failed to subscribe user: ', err);
//                                 })
//                         }
//                     })
//             })
//             .catch(function (error) {
//                 console.error('Service Worker Error', error);
//             });
//     } else {
//         console.warn('Push messaging is not supported');
//     }
// }
async function installServiceWorker(addSubscriptionCallback){
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');
        try {
            const swReg = await  navigator.serviceWorker.register('sw.js');
            console.log('service worker registered');
            swRegistration = swReg;
            const subscription = await swRegistration.pushManager.getSubscription();
            console.log('subscription is',JSON.stringify(subscription));
            isSubscribed = !(subscription === null);
            if (isSubscribed) {
                console.log('User is already subscribed');
                debugger;
            }
            else{
                const newSubscription = await  swRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlB64ToUint8Array(applicationKey)
                });
                console.log(newSubscription);
                console.log('User is subscribed');
                await addSubscriptionCallback(JSON.stringify(newSubscription));

                isSubscribed = true;
                debugger;
            }
        
        } catch (error) {
            console.log(error.message);
            console.error(error);
        }
    }
}
let helperFunctions ={installServiceWorker};

// Send request to database for add new subscriber
function saveSubscription(subscription) {
    console.log('called network call')
    debugger;
    let xmlHttp = new XMLHttpRequest();
    //put here API address
    xmlHttp.open("POST", "http://localhost:5000/subscribe");
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState != 4) return;
        if (xmlHttp.status != 200 && xmlHttp.status != 304) {
            console.log('HTTP error ' + xmlHttp.status, null);
        } else {
            console.log("User subscribed to server");
        }
    };

    xmlHttp.send(JSON.stringify(subscription));
    console.log('completed network call');
    debugger;
}

window.helperFunctions=helperFunctions;