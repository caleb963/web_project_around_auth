class Api {
    constructor({ adress, groupId, token }) {
        this._adress = adress;
        this._groupId = groupId;
        this._token = token;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._adress}/v1/${this._groupId}/users/me`, {
            headers: {
                authorization: this._token,
            },

        }).then(this._handleResponse);
    }

    getCards() {
        return fetch(`${this._adress}/v1/${this._groupId}/cards`, {
            headers: {
                authorization: this._token,
            },
        }).then(this._handleResponse);
    }


changeLikeCardStatus(cardId, isLiked) {
return fetch(`${this._adress}/v1/${this._groupId}/cards/likes/${cardId}`, {
    method: isLiked ? 'PUT' : 'DELETE',
    headers: {
        authorization: this._token,
    },
}).then(this._handleResponse);
}

deleteCard(cardId) {
    return fetch(`${this._adress}/v1/${this._groupId}/cards/${cardId}`, {
        method: 'DELETE', 
        headers: {
            authorization: this._token,
        },
    }).then(this._handleResponse);
  }


updateUserInfo(data) {
    return fetch(`${this._adress}/v1/${this._groupId}/users/me`, {
    method: 'PATCH',
    headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: data.name,
        about: data.about,
    }),


}).then(this._handleResponse);
}

setUserAvatar(data) {
  return fetch(`${this._adress}/v1/${this._groupId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
        authorization : this._token,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        avatar: data.avatar,
    }),
        }).then(this._handleResponse);
  }


addCard(data) {
    return fetch(`${this._adress}/v1/${this._groupId}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token, 
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            link: data.link,
        }),
    }).then(this._handleResponse);
}
}

const api = new Api({
    adress: 'https://around.nomoreparties.co',
    groupId: 'web_es_12',
    token:  'cff91bad-a8c7-417a-948a-f02fc6d5768b',
});

export default api;