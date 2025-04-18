// src/services/api.js
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Function to retrieve the access token from localStorage
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Function to retrieve the refresh token from localStorage
function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

// Function to refresh the access token
function refreshAuthToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.log('Refresh token not found, redirecting to login.');
    window.location.href = '/login.html';
    return Promise.reject('No refresh token available');
  }

  return fetch(`${API_BASE_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh: refreshToken })
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject('Failed to refresh token');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('authToken', data.access);
      return data.access;
    })
    .catch(error => {
      console.error('Token refresh failed', error);
      window.location.href = '/login.html';
      throw error;
    });
}

// Function to make authenticated API requests with token handling
function makeAuthenticatedRequest(method, endpoint, data = null) {
  const token = getAuthToken();

  if (!token) {
    console.log('Token not found, redirecting to login.');
    window.location.href = '/login.html';
    return;
  }

  return fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: data ? JSON.stringify(data) : null
  })
    .then(response => {
      if (response.status === 401) {
        // Token expired or invalid, try to refresh it
        return refreshAuthToken().then(newToken => {
          // Retry the original request with the new token
          return fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken}`
            },
            body: data ? JSON.stringify(data) : null
          });
        });
      }
      
      return response;
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject('Error occurred while making request');
      }
      if (response.status === 204) {
        return null; // No content to return
      }
      return response.json();
    })
    .catch(error => {
      console.error('Request failed', error);
      throw error;
    });
}

export const login = (username, password) => {
  return fetch(`${API_BASE_URL}/auth/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject('Login failed');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      return data;
    })
    .catch(error => {
      console.error('Login request failed', error);
      throw error;
    });
};

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
}

export const register = (user) => {
  return fetch(`${API_BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject('Registration failed');
      }
      return response.json();
    }).
    then(data => {
      // Automatically log in the user after registration
      // save the access token in local storage
      localStorage.setItem('authToken', data.access);
      // save the refresh token in local storage
      localStorage.setItem('refreshToken', data.refresh);

      return data;
    })
    .catch(error => {
      console.error('Registration request failed', error);
      throw error;
    });
};


export const getDepartments = () => makeAuthenticatedRequest('GET', '/departments/departments/');
export const addDepartment = (department) => {
  return makeAuthenticatedRequest('POST', '/departments/departments/', department);
};
export const updateDepartment = (id, department) => {
  return makeAuthenticatedRequest('PUT', `/departments/departments/${id}/`, department);
};
export const deleteDepartment = (id) => {
  return makeAuthenticatedRequest('DELETE', `/departments/departments/${id}/`)
};

// src/services/api.js

export const getMachines = () => makeAuthenticatedRequest('GET', '/machines/machines/');
export const addMachine = (machine) => makeAuthenticatedRequest('POST', '/machines/machines/', machine);
export const updateMachine = (id, machine) => makeAuthenticatedRequest('PUT', `/machines/machines/${id}/`, machine);
export const deleteMachine = (id) => makeAuthenticatedRequest('DELETE', `/machines/machines/${id}/`);


// getJobs
export const getJobs = () => makeAuthenticatedRequest('GET', '/jobs/jobs/');

//  getNotifications 
export const getNotifications = () => makeAuthenticatedRequest('GET', '/notifications/notifications/');