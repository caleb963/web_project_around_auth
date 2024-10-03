const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then((response) => {
        if (!response.ok){
            return Promise.reject(`Error: ${response.status}`);
        }
       return  response.json();
    });
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(`Error: ${response.status}`);
        }
    return response.json()
});
};