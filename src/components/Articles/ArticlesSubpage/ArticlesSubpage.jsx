import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { fetchApi } from '../../../api/fetchApi';

import ArticleElement from '../../../components/Articles/ArticleElement/ArticleElement';
import Paginator from '../../../components/Paginator/Paginator';
import ArticlesLoading from '../ArticlesLoading/ArticlesLoading';

import './ArticlesSubpage.scss';


const ArticlesSubpage = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const filter = {
        skip: currentPage === 1 ? 0 : (currentPage - 1) * limit,
        limit: limit,
        category: category ? String(category) : ""
    }

    useEffect(() => {
        fetchApi('/articles/get?' + new URLSearchParams(filter), {
            method: "GET",
        })
            .then(response => {
                console.log(response)
                setArticles(response);
                setPages(Math.ceil(response.count / limit));
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setErrorMessage(message);
            });
    }, [currentPage, category]);


    useEffect(() => {
        setCurrentPage(1);
    }, [category]);


    const changeCurrentPage = (page) => {
        setCurrentPage(page);
    }


    return (
        <>
            {!errorMessage ? null :
                <Alert variant='danger'>
                    {errorMessage}
                </Alert>
            }
            {articles && articles.count !== 0 ?
                articles.data.map((article) =>
                    <ArticleElement
                        key={article._id}
                        category={article.category}
                        created={article.created}
                        picture={article.picture}
                        text={article.text}
                        title={article.title}
                        user={article.user}
                        _id={article._id}
                    />)
                : <ArticlesLoading />}
            <div className="pagination-interface">
                {articles && articles.count !== 0 ?
                    <Paginator pages={pages} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />
                    : null}
            </div>
        </>
    )
}

export default ArticlesSubpage;