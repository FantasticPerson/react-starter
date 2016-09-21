import AppError, {ERROR_TYPES} from './AppError';
import Cache from '../models/Cache';
import OfflineSyncRequest from '../models/OfflineSyncRequest'

const ADAPTER_URL = 'http://61.155.85.77:10006/';

const JSON_COMMON_OPTS = {
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  },
  credentials: 'include'
};

//mostly just user id.
export const config = {
  appendHashKey: '',
  httpStatusErrorCallback: ()=> {
    console.log('default httpStatusErrorCallback');
  }
};

function filterJsonResponse(resJson, url) {
  /**
   * {
     *  success,
     *  message,
     *  data
     * }
   *
   */
  if (resJson.success) {
    return resJson.data;
  } else {
    console.error(`${url} Error: resJson.message ${resJson.message}`);
    throw new AppError(ERROR_TYPES.remote_data_unsuccess, resJson.message);
  }
}

function filterHttpStatusResponse(response, url) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  var error = null;
  if (response.status == 410) {
    error = new AppError(ERROR_TYPES.http_status_api_notsupport_error, response.statusText, response.content);
  } else if (response.status == 401) {
    error = new AppError(ERROR_TYPES.http_status_unauth, response.statusText, response.content);
  }
  else {
    error = new AppError(ERROR_TYPES.http_status_error, response.statusText, response.content);
  }
  error.response = response;

  console.warn(`${url} Error: http status error ${response.statusText}`);

  if (config.httpStatusErrorCallback) {
    config.httpStatusErrorCallback(error);
  }

  throw error;
}

export function post_json(url, body = {},
                          offlineSyncRequest = false,
                          addUrlPrefix = true) {

  body.client_ver = __VERSION__;

  if (addUrlPrefix) {
    url = `${ADAPTER_URL}/${url}`;
  }

  let options = {
    ...JSON_COMMON_OPTS,
    method: 'post',
    body: JSON.stringify(body)
  };

  return fetch(url, options)
    .then(response => response,
      err => {
        if (offlineSyncRequest) {
          offlineSyncRequest.user_id = offlineSyncRequest.hasOwnProperty('user_id') ?
            offlineSyncRequest.user_id :
            config.appendHashKey;

          offlineSyncRequest.time = Date.now();
          offlineSyncRequest.body = body;
          offlineSyncRequest.url = url;
          OfflineSyncRequest.add(offlineSyncRequest);
        }

        var appErr = new AppError(ERROR_TYPES.network_error, err.message, err);
        throw appErr;
      }
    )
    .then(response => {
      return response.json().then(json => {
        response.content = json;
        return response;
      })
    })
    .then(response => {
      return response
    })
    .then(response => filterHttpStatusResponse(response, url))
    .then(response => filterJsonResponse(response.content, url));
}

export function get_json(url, data = {}, useCache = true) {
  let params = '';

  if (!data) data = {};
  data.client_ver = __VERSION__;

  let paramsKeys = Object.keys(data);
  if (paramsKeys.length > 0) {
    paramsKeys.forEach((key, index)=> {
      let prefix = index === 0 ? '?' : '&';
      params += `${prefix}${key}=${data[key]}`;
    })
  }

  url = `${ADAPTER_URL}/${url}${params}`;

  if (useCache) {
    let cachHash = config.appendHashKey + ':' + url;
    return Cache.findResult(cachHash).then(
      result => {
        if (!!result) {
          return result;
        } else {
          return fetch_remote_json(url, true);
        }
      }
    )
  } else {
    return fetch_remote_json(url);
  }
}

export function fetch_remote_json(url, useCache) {
  return fetch(url, {
    ...JSON_COMMON_OPTS,
    method: 'get'
  })
    .then(response => response,
      err => {
        throw new AppError(ERROR_TYPES.network_error, err.message, err);
      }
    )
    .then(response => filterHttpStatusResponse(response, url))
    .then(response => response.json())
    .then(response => filterJsonResponse(response, url))
    .then(result => {
      if (!useCache) return result;

      let cacheHash = config.appendHashKey + ':' + url;
      return Cache.saveResult(cacheHash, result);
    })
}

export function fetch_remote_json2(url) {
  return fetch(url, {
    method: 'get'
  })
    .then(response => response,
      err => {
        throw new AppError(ERROR_TYPES.network_error, err.message, err);
      }
    )
    .then(response => filterHttpStatusResponse(response, url))
    .then(response => response.json())
}

export function get_local_json(url) {
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'get'
  })
    .then(response => response.json())
    .catch(error=> {
      return null;
    })
}
