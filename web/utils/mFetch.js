/**
 * Created by dandan.wu on 16/9/21.
 */
import 'es6-promise'
import fetch from 'isomorphic-fetch'

const ADAPTER_URL = 'http://61.155.85.77:10006';
const JSON_COMMON_OPTS = {
    headers: {
        Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        // credentials: 'include'
    }
};


export function myfetch(url,isGet){
    let url2 = `${ADAPTER_URL}/${url}`;
    fetch(url2,{
        headers: {
            Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            // credentials: 'include'
        },
        method: (isGet ? 'get' : 'post'),
        mode:'no-cors'
    })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response;
    })
    .then(function(stories) {
        console.log(stories);
    });
}