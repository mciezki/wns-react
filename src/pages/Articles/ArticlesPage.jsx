import React, { useEffect, useState } from 'react';
import { Alert, Row, Col, Pagination } from 'react-bootstrap';
import { fetchApi } from '../../api/fetchApi';
import ArticleList from '../../components/Articles/ArticleList/ArticleList';

import './ArticlesPage.scss';


const ArticlesPage = () => {
    const [articles, setArticles] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const filter = {
        skip: currentPage === 1 ? 0 : (currentPage - 1) * limit,
        limit: limit
    }

    useEffect(() => {
        fetchApi('/articles/get?' + new URLSearchParams(filter), {
            method: "GET",
        })
            .then(response => {
                setArticles(response);
                setPages(Math.ceil(response.count / limit));
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setErrorMessage(message);
            });
    }, [currentPage]);


    const changePagination = (e) => {
        const { id } = e.target;

        switch (id) {
            case "first":
                setCurrentPage(1);
                break;
            case "prev":
                setCurrentPage(prevState => prevState - 1);
                break;
            case "next":
                setCurrentPage(prevState => prevState + 1);
                break;
            case "last":
                setCurrentPage(Number(pages));
                break;
            default:
                setCurrentPage(Number(id));
                break;
        };
    }

    const items = [];
    for (let i = 2; i < pages; i++) {
        items.push(
            <Pagination.Item key={i} id={i} active={i === currentPage} onClick={e => changePagination(e)} >
                {i}
            </Pagination.Item>
        );
    };


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
                    <div className="pagination-interface">
                        {articles !== null ?
                            <Pagination>
                                <Pagination.First disabled={currentPage === 1} id="first" onClick={e => changePagination(e)} />
                                <Pagination.Prev disabled={currentPage === 1} id="prev" onClick={e => changePagination(e)} />
                                <Pagination.Item id={1} active={currentPage === 1} onClick={e => changePagination(e)} >{1}</Pagination.Item>
                                {currentPage > 2 ? <Pagination.Ellipsis disabled /> : null}
                                {items.slice(currentPage === 1 ? 0 : currentPage === 2 ? currentPage - 2 : currentPage - 3, currentPage + 1)}
                                {currentPage < pages - 2 ? <Pagination.Ellipsis disabled /> : null}
                                <Pagination.Item id={pages} active={currentPage === pages} onClick={e => changePagination(e)} >{pages}</Pagination.Item>
                                <Pagination.Next disabled={currentPage === pages} id="next" onClick={e => changePagination(e)} />
                                <Pagination.Last disabled={currentPage === pages} id="last" onClick={e => changePagination(e)} />
                            </Pagination>
                            : null}
                    </div>
                </Col>
                <Col lg={3}>
                    Nawigacja
                </Col>
            </Row>
        </div>
    )
}

export default ArticlesPage;