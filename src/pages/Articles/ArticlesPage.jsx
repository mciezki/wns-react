import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Alert } from 'react-bootstrap';
import { fetchApi } from '../../api/fetchApi';
import {
    CLEAR_MESSAGE,
    SET_MESSAGE
} from '../../actions/types';


const ArticlesPage = () => {
    const [articles, setArticles] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);


    useEffect(() => {
        fetchApi('/articles/get?' + new URLSearchParams({
            skip: skip,
            limit: limit
        }), {
            method: "GET",
        })
            .then(response => {
                console.log(response.data);
                setArticles(response.data);
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setErrorMessage(message);
            });
    }, []);


    return (
        <div className='articles'>
            {!errorMessage ? null :
                <Alert variant='danger'>
                    {errorMessage}
                </Alert>
            }
            Lista artykułów
        </div>
    )
}

export default ArticlesPage;