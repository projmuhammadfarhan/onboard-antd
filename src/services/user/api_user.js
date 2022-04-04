import { request } from 'umi';

const setDB = 'http://localhost:8001/';
const user_token = localStorage.getItem('user_token');

export async function POST_User(body) {
  // console.log('USER TOKEN API : ', JSON.stringify(user_token));
  console.log('POST USER BODY : ', body);
  return request(setDB + 'users', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + user_token,
    },
    data: JSON.stringify(body),
  });
}

export async function GET_Users() {
  // console.log('USER TOKEN API : ', JSON.stringify(user_token));
  return request(setDB + 'users', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + user_token,
    },
  });
}

export async function GET_User() {
  // console.log('USER TOKEN API : ', JSON.stringify(user_token));
  return request(setDB + 'users/:id', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + user_token,
    },
  });
}

export async function PUT_User(body) {
  // console.log('USER TOKEN API : ', JSON.stringify(user_token));
  return request(setDB + 'users/:id', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + user_token,
    },
    body: JSON.stringify(body),
  });
}

export async function DELETE_User() {
  // console.log('USER TOKEN API : ', JSON.stringify(user_token));
  return request(setDB + 'users/:id', {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + user_token,
    },
  });
}
