import React from 'react'
import http from '../http/api'
import { connect } from 'react-redux'
import { getError, loginRequested, loginSucceeded, loginFailed, resetAuthError } from '../store/entities/auth'
import Form from '../components/Shared/Form'
import Alert from '../components/Shared/Alert'
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    pw: false
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { history } = this.props;
    try {
      this.props.authenticateUser();
      const res = await http.post('/admin/login', this.state.data)
      const data = res.data

      if (data.type === "error") {

        this.props.loginFailed(data)
        history.push('/login')

      } else {

        this.props.loginSucceeded(data)
        history.push('/app')

      }

    } catch (err) {
      this.props.loginFailed(err.res.data)
      history.push('/login')
    }
  }

  handleShowPw = (e) => {
    e.preventDefault()

    const x = { ...this.state }
    x.pw = true
    this.setState(x)


  }

  handleHidePw = (e) => {
    e.preventDefault()

    const x = { ...this.state }
    x.pw = false

    this.setState(x)
  }

  render() {
    const { error } = this.props
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center sm:p-12 md:w-1/2">
              <form onSubmit={this.handleSubmit}>
                <div className="w-full">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                  {error && <Alert message="wrong email or password" color="red" actiontype={resetAuthError.type} />}
                  {this.renderInput("email", "Email", "email")}
                  {this.renderInput("password", "Password", this.state.pw ? "name" : "password")}

                  <div className="absolute inset-y-0 left-1 ml-20 pl-16 pt-8 flex items-center text-sm leading-5">
                    {!this.state.pw ? <svg className="h-6 text-gray-700" onClick={this.handleShowPw} fill="none" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512">
                      <path fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                      </path>
                    </svg>
                      :
                      <svg className="h-6 text-gray-700" fill="none" onClick={this.handleHidePw} xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512">
                        <path fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                        </path>
                      </svg>}
                  </div>

                  {this.renderButton("Log in", "submit")}

                  <hr className="my-8" />

                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  authenticateUser: () => dispatch(loginRequested()),
  loginSucceeded: (user) => dispatch(loginSucceeded(user)),
  loginFailed: (error) => dispatch(loginFailed(error))
})

const mapStateToProps = (state) => ({
  error: getError(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)
