import React, { useEffect, useState } from 'react';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import { fetchApi } from '../../api/fetchApi';
import { useWindowWidthAndHeight } from '../../hooks/responsiveHook';
import { useHistory } from 'react-router-dom';

import { cleanMessage } from '../../actions/message';

import defaultNews from '../../images/default/defaultNews.jpg';
import defaultAvatar from '../../images/default/defaultAvatar.svg';

import './ArticlePage.scss';


const ArticlePage = (props) => {
    const [width, height] = useWindowWidthAndHeight();

    const [article, setArticle] = useState(null);
    const [propositions, setPropositions] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    useEffect(() => {
        cleanMessage();
        const articleId = props.location.pathname.replace('/article/', '');

        fetchApi(`/articles/get/${articleId}`, {
            method: "GET",
        })
            .then(response => {
                console.log(response.data)
                setArticle(response.data);
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setErrorMessage(message);
            });
    }, [props.location.pathname]);

    const filter = {
        limit: 5,
        // category: article?.category ? String(article?.category) : ""
    }

    useEffect(() => {
        const articleId = props.location.pathname.replace('/article/', '');

        fetchApi('/articles/get?' + new URLSearchParams(filter), {
            method: "GET",
        })
            .then(response => {
                const propositions = response.data.filter(proposition => proposition._id !== articleId);
                setPropositions(propositions);
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setErrorMessage(message);
            });
    }, [props.location.pathname]);

    const propList = propositions?.map((proposition, index) => (
        <div className='proposition-container' key={index} onClick={() => history.push(`/article/${proposition._id}`)}>
            <img src={proposition.picture ? proposition.picture : defaultNews} alt="proposition" />
            <p>{proposition.title}</p>
        </div>
    ))

    return (
        <div className='articles'>
            {!errorMessage ?
                <Container fluid>
                    <Row>
                        <Col lg={width > 995 ? 10 : 12}>
                            <article className="article-container">
                                <div className="article-header">
                                    <h3>{article?.title}</h3>
                                    <p className="article-date">{article?.created.replaceAll('-', '/').replace('T', ' ').split('.')[0]}</p>
                                    <p className="article-info"><span style={{ fontStyle: 'italic' }}>category:</span> <span className='category-name' onClick={() => history.push(`/articles/${article?.category}`)}>{article?.category}</span></p>
                                </div>
                                <div className="article-content clearfix">
                                    <img src={article?.picture ? article?.picture : defaultNews} alt="news" />
                                    <p className="article-preview-text">{article?.text}</p>
                                </div>
                                <div className="article-footer">
                                    <h5>Check for more:</h5>
                                    <div className='list-flex-container'>
                                        {propList}
                                    </div>
                                </div>
                            </article>
                        </Col>
                        <Col lg={width <= 995 ? { order: 'first' } : 2} >
                            <div className="author-container">
                                <div className="author-header">
                                    <h6>Author:</h6>
                                </div>
                                <div className="author-content">
                                    <img src={defaultAvatar} alt='user avatar' /><span className='author-username' onClick={() => history.push(`/profile/${article?.user}`)}>{article?.user}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                :
                <Alert variant='danger'>
                    {errorMessage}
                </Alert>
            }
        </div>
    )
}

export default ArticlePage;