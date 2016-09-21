/**
 * Created by xuexinli on 15/12/3.
 */

import 'isomorphic-fetch';
export let fetchRoot = 'http://61.155.85.77:10006/';
export const COMMON_REQUEST = 'COMMON_REQUEST';
export const COMMON_SUCCESS = 'COMMON_SUCCESS';
export const COMMON_FAILED = 'COMMON_FAILED';

export function changeFetchRoot(root) {
  fetchRoot = root;
}
function remoteFetch(url, params) {
  const fullUrl = url.indexOf(fetchRoot) === -1 ? fetchRoot + url : url;
  return fetch(fullUrl).then(response=> {
    if (response.headers.get('content-type').indexOf('application/json') !== -1) {
      return response.json().then(json=>({json, response}))
    }
    return response.blob().then(blob=>({blob, response}))
  });
}
export const FETCH_API = Symbol('FETCH API');
export default ({dispatch,getState})=>(next)=>(action)=> {
  const fetchAPI = action[FETCH_API];

  if (typeof fetchAPI === 'undefined') {
    return next(action)
  }

  let {request,success,failed} = fetchAPI;
  const {url,params} = fetchAPI;

  request = (request ? request : COMMON_REQUEST);
  success = success ? success : COMMON_SUCCESS;
  failed = failed ? failed : COMMON_FAILED;
  if (!url) {
    throw new Error('url is missing');
  }

  function actionWith(data) {
    if (data.response) {
      console.log(data.response.json);
    }
    const finalAction = Object.assign({}, action, data);
    delete finalAction[FETCH_API];
    return finalAction;
  }

  next(actionWith({type: request}));

  return remoteFetch(url, params).then(
    response=>next(actionWith({
      response,
      type: success
    })),
    error=>next(actionWith({
      error: error.message || 'server error',
      type: failed
    }))
  );
}
