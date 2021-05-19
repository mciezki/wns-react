import React, { useState, useEffect } from 'react';

import './ArticlesLoading.scss';

const ArticlesLoading = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(prevState => !prevState)
        }, 5000)
    }, [])


    return (
        <div className={loading ? "loading" : "empty"}>
            {loading ? <h3>Loading...</h3> : <h3>Oops, empty :c </h3>}
        </div>
    )
}

export default ArticlesLoading;