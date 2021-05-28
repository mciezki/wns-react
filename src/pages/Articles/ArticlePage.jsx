import React, { useEffect, useState } from 'react';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import { fetchApi } from '../../api/fetchApi';
import { useWindowWidthAndHeight } from '../../hooks/responsiveHook';

import { cleanMessage } from '../../actions/message';

import './ArticlePage.scss';


const ArticlePage = (props) => {
    const [width, height] = useWindowWidthAndHeight();

    const [article, setArticle] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        cleanMessage();
        const articleId = props.location.pathname.replace('/article/', '');

        fetchApi(`/articles/get/${articleId}`, {
            method: "GET",
        })
            .then(response => {
                console.log(response)
                setArticle(response.data);
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setErrorMessage(message);
            });
    }, []);

    return (
        <div className='articles'>
            {!errorMessage ?
                <Container fluid>
                    <Row>
                        <Col lg={width > 995 ? 10 : 12}>
                            Artykuł
                    </Col>
                        {width > 995 ?
                            <Col lg={2} >
                                Autor
                        </Col>
                            : null}
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