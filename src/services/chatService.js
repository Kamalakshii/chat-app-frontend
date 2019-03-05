import axios from 'axios';
/**
 * 
 * @param {*used to get AllUsers data  } data 
 */
export function chatServices(data) {
    return axios('/getAllUsers',
        {
            method: "GET",
            data: data
        })
}
/**
 * 
 * @param {*get AllChats data} data 
 */
export function userChatArray(data) {
    return axios('/getAllChats', {
        method: "GET",
        data: data
    })
}