import JwtDecode from 'jwt-decode'

export default class User {
  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  constructor ({ id, Id_user, email }) {
    this.id = id // eslint-disable-line camelcase
    this.Id_user = Id_user
    this.email = email
  }

  get isAdmin () {
    return this.admin
  }
}