import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  NotFoundPage,
  HomePage,
  RegisterPage,
  TestPage,
  AddArticlePage
} from './pages';
import { routes, history } from './helpers';
import "bootstrap/dist/css/bootstrap.min.css";

import Footer from './components/Footer/Footer';

import Navigation from './components/Navigation/Navigation';

const App = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="App">
      <Router history={history}>
        <Navigation />
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.test} component={TestPage} />
          {!user ? <Route exact path={routes.register} component={RegisterPage} /> : null}
          <Route exact path={routes.article.self} render={() => <h1>Articles list</h1>} />
          {user ? <Route path={routes.article.addArticle} component={AddArticlePage} /> : null}
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
