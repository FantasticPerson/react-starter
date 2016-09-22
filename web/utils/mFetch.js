/**
 * Created by dandan.wu on 16/9/21.
 */
import 'es6-promise'
import fetch from 'isomorphic-fetch'

const ADAPTER_URL = 'http://127.0.0.1:10006';
const JSON_COMMON_OPTS = {
    headers: {
        Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        // credentials: 'include'
    }
};

let addUser = {
    mac:"56:E8",
    code:"0513006",
    contact:"xiaoliu",
    ctel:"11111111111",
    filehost:'65.111.11.11',
    fileport:1004,
    name:"www.alo7.com",
    server:"xiaowang",
    tcphost:"66.66.6.66",
    tcpport:1002,
    timeout:"2017-09-12",
    webhost:"66.66.66.66",
    webport:1006
};

export function fetch_post(url,obj){
    let url2 = `${ADAPTER_URL}/${url}`+'?'+'code2:'+'123456';
    fetch(url2,{
            headers: {
                "Content-Type":"multipart/form-data",
                "Accept":'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                // credentials: 'include'
            },
            method: 'post',
            body:addUser
        }
    )
    .then(response => response,
        err => {
            throw Error(url + ' post error :'+err);
        }
    )
    .then(response => {
        return response.json().then(json => {
            response.content = json;
            return response;
        })
    })
    .then(response => {
        console.log(response);
        return response
    })
}

export function myfetch(url,isGet,obj={}){
    let url2 = `${ADAPTER_URL}/${url}`;
    fetch(url2,{
        headers: {
            Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            // credentials: 'include'
        },
        method: (isGet ? 'get' : 'post')
    })
    .then(response => response,
        err => {
            throw new Error('fetch error:' + err);
        }
    )
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
    })
    .then(response =>response.json())
    .then(response=>{
        console.log(response);
    })
}