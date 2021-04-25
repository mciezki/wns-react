import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  NotFoundPage,
  HomePage,
  LoginPage,
  RegisterPage,
  TestPage
} from './pages';
import { routes } from './helpers';
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from './components/Navigation/Navigation';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.login} component={LoginPage} />
          <Route exact path={routes.register} component={RegisterPage} />
          <Route exact path={routes.test} component={TestPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
