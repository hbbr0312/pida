export const LOGOUT = `LOGOUT`
export const LOGIN = `LOGIN`

export function logout_() {
  return {
    type: LOGOUT
  }
}

export function login_() {
  return {
    type: LOGIN
  }
}
