import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from "./store/configureStore";
import ProtectedRoute from "./components/ProtectedRoute";
import { loginFailed, loginRequested } from "./store/entities/auth";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

const store = configureStore();

class App extends React.Component {
  async componentDidMount() {
    try{
      store.dispatch({type: loginRequested.type});
    }catch(error) {
      store.dispatch({type: loginFailed.type});
    }
  }
  render () {
    return (
      <Provider store={store}>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/forgot-password" component={ForgotPassword} />

            {/* Place new routes over this */}
            <ProtectedRoute path="/app" component={Layout} />
            {/* If you have an index page, you can remothis Redirect */}
            <Redirect exact from="/" to="/login" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
