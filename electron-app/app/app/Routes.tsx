/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import {useAuth} from './context';
// Lazily load  routes and code split with webpack
// const LazyCounterPage = React.lazy(() =>
//   import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
// );

// const CounterPage = (props: Record<string, any>) => (
//   <React.Suspense fallback={<h1>Loading...</h1>}>
//     <LazyCounterPage {...props} />
//   </React.Suspense>
// );

const AuthenticatedRoute = props => {

  const {component: Component, ...rest} = props;
  const {user} = useAuth()
  
  return (
    <Route 
      {...rest}
      render={(props) => (
        user.uid ? (<Component {...props}/>) : (<Redirect to={{
          pathname: "/"
        }}/>) 
      )} 
    />
  )
}

const PublicRoute = props => {

  const {component: Component, ...rest} = props;
  const {user} = useAuth()
  
  return (
    <Route 
      {...rest}
      render={(props) => (
        !user.uid ? (<Component {...props}/>) : (<Redirect to={{
          pathname: "/home"
        }}/>) 
      )} 
    />
  )
}

export default function Routes() {
  return (

      <Router>
        <Switch>

          <PublicRoute path={routes.SIGNUP} component={SignupPage} />
          <PublicRoute path={routes.LOGIN} component={LoginPage}/>
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </Router>
  );
}
