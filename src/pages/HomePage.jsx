import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchApi } from '../api/fetchApi';
import Slider from '../components/Slider/Slider';
import {
    CLEAR_MESSAGE,
} from '../actions/types';

import './HomePage.scss'

const HomePage = () => {
    const [newestArticle, setNewestArticle] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        fetchApi('/articles/get?' + new URLSearchParams({
            limit: 1
        }), {
            method: "GET",
        })
            .then(response => {
                console.log(response.data);
                setNewestArticle(response.data);
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setErrorMessage(message);
            });
    }, []);

    useEffect(() => {
        dispatch({
            type: CLEAR_MESSAGE,
        });
    }, []);


    return (
        <div className="homepage">
            <Slider />
            <h1>Home Page</h1>
        </div>
    )
}

export default HomePage;