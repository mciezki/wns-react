import React, { useEffect, useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { fetchApi } from '../../api/fetchApi';
import ArticleList from '../../components/Articles/ArticleList/ArticleList';

import './ArticlesPage.scss';


const ArticlesPage = () => {
    const [articles, setArticles] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchApi('/articles/get?' + new URLSearchParams({
            skip: skip,
            limit: limit
        }), {
            method: "GET",
        })
            .then(response => {
                console.log(response);
                setArticles(response);
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setErrorMessage(message);
            });
    }, []);


    return (
        <div className='articles'>
            <Row>
                <Col lg={9}>
                    {!errorMessage ? null :
                        <Alert variant='danger'>
                            {errorMessage}
                        </Alert>
                    }
                    {articles !== null ?
                        articles.data.map((article) =>
                            <ArticleList
                                key={article._id}
                                category={article.category}
                                created={article.created}
                                picture={article.picture}
                                text={article.text}
                                title={article.title}
                                user={article.user}
                                _id={article._id}
                            />)
                        : 'Loading...'}
                </Col>
                <Col lg={3}>
                    Nawigacja
                </Col>
            </Row>
        </div>
    )
}

export default ArticlesPage;