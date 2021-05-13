import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import { routes } from '../../helpers';
import { useWindowWidthAndHeight } from '../../hooks/responsiveHook';

import ArticlesSubpage from '../../components/Articles/ArticlesSubpage/ArticlesSubpage';

import './ArticlesPage.scss';


const ArticlesPage = (props) => {
    const [width, height] = useWindowWidthAndHeight();

    return (
        <div className='articles'>
            <Row>
                <Col lg={width > 995 ? 9 : 12}>
                    <Switch location={props.location}>
                        <Route path={routes.articles.self} exact render={(props) => <ArticlesSubpage {...props} />} />
                        <Route path={routes.articles.technology} exact render={(props) => <ArticlesSubpage {...props} category="technology" />} />
                        <Route path={routes.articles.lifeStyle} exact render={(props) => <ArticlesSubpage {...props} category="life style" />} />
                        <Route path={routes.articles.games} exact render={(props) => <ArticlesSubpage {...props} category="games" />} />
                        <Route path={routes.articles.health} exact render={(props) => <ArticlesSubpage {...props} category="health" />} />
                        <Route path={routes.articles.politics} exact render={(props) => <ArticlesSubpage {...props} category="politics" />} />
                        <Route path={routes.articles.tragedies} exact render={(props) => <ArticlesSubpage {...props} category="tragedies" />} />
                        <Route path={routes.articles.fun} exact render={(props) => <ArticlesSubpage {...props} category="fun" />} />
                    </Switch>
                </Col>
                <Col lg={3}>
                    <NavLink to={'/articles/technology'} >Test do technologii</NavLink>
                </Col>
            </Row>
        </div>
    )
}

export default ArticlesPage;