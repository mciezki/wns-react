import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../helpers';
import { useWindowWidthAndHeight } from '../../hooks/responsiveHook';

import ArticlesSubpage from '../../components/Articles/ArticlesSubpage/ArticlesSubpage';
import RouteNav from '../../components/RouteNav/RouteNav';
import DropdownNavigator from '../../components/DropdownNavigator/DropdownNavigator';


import './ArticlesPage.scss';

const navigationLinks = [
    { icon: 'newspaper', name: 'All', link: '/articles', exact: true },
    { icon: 'robot', name: 'Technology', link: '/articles/technology', exact: false },
    { icon: 'running', name: 'Life Style', link: '/articles/life-style', exact: false },
    { icon: 'gamepad', name: 'Games', link: '/articles/games', exact: false },
    { icon: 'heart', name: 'Health', link: '/articles/health', exact: false },
    { icon: 'handshake', name: 'Politics', link: '/articles/politics', exact: false },
    { icon: 'bomb', name: 'Tragedies', link: '/articles/tragedies', exact: false },
    { icon: 'theater-masks', name: 'Fun', link: '/articles/fun', exact: false },
]

const ArticlesPage = (props) => {
    const [width, height] = useWindowWidthAndHeight();

    return (
        <div className='articles'>
            <Container fluid>
                <Row>
                    <Col lg={width > 995 ? 9 : 12}>
                        {width < 995 ? <DropdownNavigator paths={navigationLinks} className="route-small-nav" /> : null}
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
                    {width > 995 ?
                        <Col lg={3} >
                            <RouteNav paths={navigationLinks} />
                        </Col>
                        : null}
                </Row>
            </Container>
        </div>
    )
}

export default ArticlesPage;