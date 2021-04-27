import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  NotFoundPage,
  HomePage,
  RegisterPage,
  TestPage
} from './pages';
import { routes, history } from './helpers';
import "bootstrap/dist/css/bootstrap.min.css";

import Footer from './components/Footer/Footer';

import Navigation from './components/Navigation/Navigation';

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Navigation />
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.register} component={RegisterPage} />
          <Route exact path={routes.test} component={TestPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
