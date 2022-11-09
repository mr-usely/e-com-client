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
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const {history} = this.props;
    try{
      this.props.authenticateUser();
      const res = await http.post('/admin/login', this.state.data)
      const data = res.data
      
      if(data.type === "error") {

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

  render() {
    const {error} = this.props
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
                  {error && <Alert message="wrong email or password" color="red" actiontype={resetAuthError.type}/>}
                  {this.renderInput("email", "Email", "email")}
                  {this.renderInput("password", "Password", "password")}
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
