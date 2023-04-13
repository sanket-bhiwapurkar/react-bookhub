import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errMsg: ''}

  onUsernameInputChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInputChange = event => {
    this.setState({password: event.target.value})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data)
    } else {
      this.onLoginFailure(data)
    }
  }

  onLoginSuccess = data => {
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = data => {
    const errMsg = data.error_msg
    this.setState({showErrorMsg: true, errMsg})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showErrorMsg, errMsg} = this.state
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dsmezwsiq/image/upload/v1681278392/BookHub/bookhub-bg-img-desktop_cobg2c.png"
          alt="website login"
          className="website-login-img-desktop"
        />
        <img
          src="https://res.cloudinary.com/dsmezwsiq/image/upload/v1681278392/BookHub/bookhub-bg-img-mobile_dlgppr.png"
          alt="website login"
          className="website-login-img-mobile"
        />
        <div className="form-container">
          <form className="login-form" onSubmit={this.onClickLogin}>
            <img
              src="https://res.cloudinary.com/dsmezwsiq/image/upload/v1681278391/BookHub/bookhub-logo_xavkrn.png"
              alt="login website logo"
              className="login-logo"
            />
            <label htmlFor="username" className="login-label">
              Username*
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={this.onUsernameInputChange}
            />

            <label htmlFor="password" className="login-label">
              Password*
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={this.onPasswordInputChange}
            />

            {showErrorMsg ? <p className="err-msg">{errMsg}</p> : null}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
