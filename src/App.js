import './App.css';
import { BrowserRouter as Router, HashRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  NotFoundPage,
  HomePage,
  RegisterPage,
  TestPage,
  AddArticlePage,
  ArticlesPage,
  ArticlePage
} from './pages';
import { routes, history, ScrollToTop } from './helpers';
import "bootstrap/dist/css/bootstrap.min.css";

import Footer from './components/Footer/Footer';

import Navigation from './components/Navigation/Navigation';

const App = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="App">
      <HashRouter history={history}>
        <ScrollToTop />
        <Navigation />
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.test} component={TestPage} />
          {!user ? <Route exact path={routes.register} component={RegisterPage} /> : null}
          <Route path={routes.articles.self} component={ArticlesPage} />
          <Route path={routes.article} component={ArticlePage} />
          {user ? <Route exact path={routes.addArticle} component={AddArticlePage} /> : null}
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
