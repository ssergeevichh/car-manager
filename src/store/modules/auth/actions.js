let timer

export default {
  async signup(context, payload) {
    const responseAfterLogin = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOaKgaarVkossxQl9aMcSVFRGV0mRm8FY', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    })

    const responseData = await responseAfterLogin.json()
    if (!responseAfterLogin.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.')
      throw error
    }

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    })
  },

  async logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null,
    })

    context.commit('setSelectedCar', null)
    context.commit('setCars', [])
  },

  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  },

  async login(context, payload) {
    const responseAfterLogin = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOaKgaarVkossxQl9aMcSVFRGV0mRm8FY', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    })

    const responseData = await responseAfterLogin.json()
    if (!responseAfterLogin.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.')
      throw error
    }

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    })
  },

  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token,
      userId,
    })
  },
}
