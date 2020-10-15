/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, Redirect, HashRouter as Router } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ForgetPage from './containers/ForgetPage';
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
        !!user.uid ? (<Component {...props}/>) : (<Redirect to={{
          pathname: routes.LOGIN
        }}/>) 
      )} 
    />
  )
}

const PublicRoute = props => {

  const {component: Component, ...rest} = props;
  const {user} = useAuth()
  console.log(user)
  return (
    <Route 
      {...rest}
      render={(props) => (
        !user.uid ? (<Component {...props}/>) : (<Redirect to={{
          pathname: routes.HOME
        }}/>) 
      )} 
    />
  )
}

export default function Routes() {
  return (

      <Router>
        <Switch>
          <PublicRoute path={routes.FORGET} component={ForgetPage}/>
          <PublicRoute path={routes.LOGIN} exact component={LoginPage}/>
          <PublicRoute path={routes.SIGNUP} component={SignupPage} />
          <AuthenticatedRoute path={routes.HOME} component={HomePage} />
        </Switch>
      </Router>
  );
}
