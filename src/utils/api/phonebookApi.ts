import { BACKEND_URL } from "../endpoint"

export const getContactList = async () => {
  const request = new Request(BACKEND_URL + 'api/contactList', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    }
  });
  const response = await fetch(request);
  if (response.status === 500) {
    throw new Error('internal server error');
  }
  const data = await response.json();
  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
        throw data.detail;
    }
    throw data.message.error;
  }
  return data.message;
};

export const getContactById = async (id: string) => {
  const request = new Request(BACKEND_URL + `api/contactDetail/${id}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    }
  });
  const response = await fetch(request);
  if (response.status === 500) {
    throw new Error('internal server error');
  }
  const data = await response.json();
  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
        throw data.detail;
    }
    throw data.message.error;
  }
  return data.message;
};

export const addContact = async (name: string, phone: string) => {
  const request = new Request(BACKEND_URL + '/api/addContact', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({name: name, phone: phone})
  });
  const response = await fetch(request);
  if (response.status === 500) {
    throw new Error('internal server error');
  }
  const data = await response.json();
  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
        throw data.detail;
    }
    throw data.message.error;
  }
  return data.message;
};

export const editContact = async (id: string, name: string, phone: string) => {
  const request = new Request(BACKEND_URL + `api/editContact/${id}`, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({name: name, phone: phone})
  });
  const response = await fetch(request);
  if (response.status === 500) {
    throw new Error('internal server error');
  }
  const data = await response.json();
  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
        throw data.detail;
    }
    throw data.message.error;
  }
  return data.message;
};

export const deleteContact = async (id: string) => {
  const request = new Request(BACKEND_URL + `api/deleteContact/${id}`, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    }
  });
  const response = await fetch(request);
  if (response.status === 500) {
    throw new Error('internal server error');
  }
  const data = await response.json();
  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
        throw data.detail;
    }
    throw data.message.error;
  }
  return data.message;
};