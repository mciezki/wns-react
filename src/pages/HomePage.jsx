import React from 'react';
import { fetchApi } from '../api/fetchApi';
import Slider from '../components/Slider/Slider';

const HomePage = () => {
    return (
        <>
            <Slider />
            <h1>Home Page</h1>
        </>
    )
}

export default HomePage;