import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchApi } from '../api/fetchApi';
import Slider from '../components/Slider/Slider';
import {
    CLEAR_MESSAGE,
} from '../actions/types';

import './HomePage.scss'

const HomePage = () => {

    const dispatch = useDispatch();

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