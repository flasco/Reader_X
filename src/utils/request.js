import constants from './constants';

const ROOT_PATH = constants.api_root;
const ROOT_API_PATH = `${ROOT_PATH}/api`;

function isApiUrl(url) {
  if (url.startsWith(ROOT_PATH)) {
    return url;
  }
  return `${ROOT_PATH}${url}`;
}

function parseText(response) {
  return response.text();
}

function parseJSON(text) {
  if (text.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
    return Promise.resolve({});
  }
  return Promise.resolve(JSON.parse(text));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(url, options) {
  // return Promise.resolve(fetch(isApiUrl(url), options))
  return fetch(url, options)
    .then(checkStatus)
    .then(parseText)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((error) => ({ err: error }));
}

function parseError(error) {
  try {
    return error.response.json()
    .catch( err => {
      return Promise.resolve({
        timestamp: new Date().getTime(),
        message: 'unkown error',
        status: error.response && error.response.status,
      });
    } )
    .then( err => {
      if (err.status === 401) {
        return {
          ...err,
          timestamp: new Date().getTime(),
          message: '请重新登录',
        };
      }

      if (err.status === 403) {
        return {
          ...err,
          timestamp: new Date().getTime(),
          message: '您没有权限访问该内容',
        }
      }

      return {
        ...err,
        message: err.message || err.error_description,
        timestamp: new Date().getTime(),
        status: error.response && error.response.status,
      }
    } )
  } catch (err) {
    return Promise.resolve({
      timestamp: new Date().getTime(),
      message: 'unkown error',
      status: error.response && error.response.status,
    });
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export {
  request as default,
  parseError,
}
