class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(result) {
    if (result.ok)
        return result.json();
    else
        return Promise.reject(`Ошибка ${result.status}`);
}

  _makeRequest(endpoint, options) {
      return fetch(this._options.baseUrl + endpoint, options).then(this._checkResponse);
  }

  getInfoOwner() {
    return this._makeRequest('/users/me', {
      headers: this._options.headers
    });
  }

  getInitialCards() {
    return this._makeRequest('/cards/', {
      headers: this._options.headers
    });
  }

  setInfoUser(name, about) {
    return this._makeRequest('/users/me', {
      method: 'PATCH', 
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  postCards(item) {
    return this._makeRequest('/cards/', {
      method: 'POST', 
      headers: this._options.headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    });
  }

  deleteCard(cardId) {
    return this._makeRequest('/cards/' + cardId, {
      method: 'DELETE', 
      headers: this._options.headers
    });
  }

  updateAvatar(link) {
    return this._makeRequest('/users/me/avatar', {
      method: 'PATCH', 
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  }

  updateLike(cardId, isLiked) {
    return this._makeRequest('/cards/' + cardId + '/likes', {
        method: isLiked ? 'DELETE' : 'PUT', 
        headers: this._options.headers
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'f033c51d-f6e8-4fe9-b405-d7b198a67a98',
    'Content-Type': 'application/json'
  }
});

export default api;