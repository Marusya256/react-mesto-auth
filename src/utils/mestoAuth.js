class MestoAuth {
  constructor(options) {
    this._options = options;
  }

  register (email, password) {
    return fetch('https://auth.nomoreparties.co/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((response) => {
        if (response.ok)
          return response.json();
        else
          return Promise.reject(`Ошибка ${response.status}`);

    })
  };

  authorize(email, password) {
    return fetch('https://auth.nomoreparties.co/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((response) => {
      if (response.ok)
        return response.json();
      else
        return Promise.reject(`Ошибка ${response.status}`);
    })
  };

  getContent(token) {
    return fetch('https://auth.nomoreparties.co/users/me', {
      method: 'GET', 
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then((response) => {
        if (response.ok)
          return response.json();
        else
          return Promise.reject(`Ошибка ${response.status}`);

    });
  }
}

const mestoAuth = new MestoAuth({
  baseUrl: 'https://api.nomoreparties.co',
});

export default mestoAuth;
