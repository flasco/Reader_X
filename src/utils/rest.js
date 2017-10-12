import { AsyncStorage } from 'react-native';
import querystring from 'querystring';
import request, { parseError } from './request';
import { isBlank } from './string';

async function accessToken(username, password) {
  if (!username) {
    return { err: new Error('you should specific username parameter so that to get access_token') };
  }
  if (!password) {
    return { err: new Error('you should specific password parameter so that to get access_token') };
  }
  const { data, err } = await request('/api/login', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic VWpkeXc3MzY9Og==',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `username=${username}&password=${password}`,
  });

  if (!err) {
    await AsyncStorage.setItem('access_token', data.access_token);
    return {
      access_token: data.access_token,
    };
  }

  const error = await parseError(err);
  return { err: error };
}

// async function refreshToken(refresh_token) {
//   if(!refresh_token) {
//     return { err: new Error('refresh_token should not be undefined') }
//   }
//   const { data, err } = await request('/api/oauth2/token', {
//     method: 'POST',
//     headers: {
//       'Authorization': 'Basic YXBwOnNlY3JldA==',
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
//   });

//   if (!err) {
//     await AsyncStorage.setItem('access_token', data.token);
//     await AsyncStorage.setItem('refresh_token', data.value);
//     return {
//       access_token: data.token,
//       refresh_token: data.refresh_token,
//     };
//   }

//   const error = await parseError(err);
//   return { err: error };
// }

// async function _pre() {
//   const access_token = await AsyncStorage.getItem('access_token');
//   const refresh_token = await AsyncStorage.getItem('refresh_token');
//   if (!access_token) {
//     return {
//       err: {
//         timestamp: new Date().getTime(),
//         message: 'need login',
//         status: 401,
//       },
//     }
//   }

//   return {
//     access_token,
//     refresh_token,
//   };
// }

async function rest(url, options = {}) {
  // const obj = await _pre();
  // console.log(obj)

  // if (obj.err) {
  //   return { err: obj.err };
  // }

  const access_token = await AsyncStorage.getItem('access_token');
  const { data, err } = await request(url, {
    ...options,
    headers: {
      // 'Authorization': access_token != null ? `Bearer ${access_token}` : 'Basic VWpkeXc3MzY9Og==', // could be overrided by options.headers.Authorization
      ...options.headers,
    }
  });

  if (!err) {
    return { data };
  }

  const error = await parseError(err);
  // console.log(error);
  return { err: error };
}



async function GET(url, params) {
  // console.log(`${url}${isBlank(params) ? '' : `?${querystring.stringify(params)}`}`)
  return await rest(`${url}${isBlank(params) ? '' : `?${querystring.stringify(params)}`}`);
}

async function POST(url, data) {
  return await rest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

async function PUT(url, data) {
  return await rest(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

async function PATCH(url, data) {
  return await rest(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

async function DELETE(url, data) {
  return await rest(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

async function UPLOAD(url, data) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    const value = data[key];
    formData.append(key, value);
  });
  return await rest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
}

export {
  rest as default,
  // parseError,
  accessToken,
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  UPLOAD,
};
