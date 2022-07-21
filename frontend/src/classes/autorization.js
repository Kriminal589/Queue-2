export class Auth {
  static init() {
    return new Promise((resolve, reject) => {
      VK.Auth.login(responce => {
          resolve(responce.session)
      })
    })
    .then(function (data) {
      const authData = data
      authData.error = false
      localStorage.setItem('auth-data', JSON.stringify(authData))
    })
    .catch(localStorage.setItem('auth-data', JSON.stringify({error: true})))
  }
  static async logout() {
    await VK.Auth.logout(res => {
      console.log(res)
    })
    localStorage.removeItem('auth-data')
  }
}