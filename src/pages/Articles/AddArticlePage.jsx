import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Alert } from 'react-bootstrap';
import { fetchApi } from '../../api/fetchApi';
import {
    CLEAR_MESSAGE,
    SET_MESSAGE
} from '../../actions/types';

import './AddArticlePage.scss';

import Input from '../../components/Inputs/Input';

const AddArticlePage = () => {
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();

    const [baseImage, setBaseImage] = useState('');
    const [inputReset, setInputReset] = useState(true);

    const hiddenFileInput = useRef(null);

    const dispatch = useDispatch();
    const { message } = useSelector(state => state.message);
    const { auth } = useSelector(state => state);

    useEffect(() => {
        console.log(auth)
        dispatch({
            type: CLEAR_MESSAGE,
        });
    }, []);


    const handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        setBaseImage(btoa(binaryString));
    }

    const convertImage = (e) => {
        let file = e.target.files[0]

        if (file) {
            const reader = new FileReader();
            reader.onload = handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file)
        }
    };


    const uploadClick = (e) => {
        hiddenFileInput.current.click();
    }

    const onSubmit = async (data) => {
        console.log(data.article)
        await fetchApi('/article/add', {
            method: "POST",
            body: {
                title: data.article.title,
                text: data.article.text,
                category: data.article.category,
                user: auth.user.username,
                picture: baseImage ? `data:image/png;base64,${baseImage}` : ''
            }
        }, auth.user.accessToken)
            .then(response => {
                console.log(response)
                dispatch({
                    type: SET_MESSAGE,
                    payload: response.message
                });
            })
            .then(() => {
                setInputReset(prevState => !prevState)
                setBaseImage('');
            })
            .catch(error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                dispatch({
                    type: SET_MESSAGE,
                    payload: message
                });
            });
    };


    return (
        <div className='add-content'>
            <div className="rotate-square"></div>
            <div className="stripe"></div>
            <div className="add-panel">
                <h3 className='add-header'>Add the article</h3>
                <p className='description'>create our world!</p>
                {!message ? null :
                    <Alert variant={message === 'Article posted.' ? 'success' : 'danger'}>
                        {message}
                    </Alert>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Title"
                        type="text"
                        placeholder=""
                        name="article.title"
                        register={register}
                        require={true}
                        // errors={errors && errors.article?.title ? errors.article.title : null}
                        // message="Title is needed"
                        clear={clearErrors}
                        className="title-area"
                        containerClass="head-add"
                        inputReset={inputReset}
                    />
                    <Input
                        label="Category"
                        type="select"
                        placeholder=""
                        name="article.category"
                        register={register}
                        require={true}
                        errors={errors && errors.article?.category ? errors.article.category : null}
                        message="Select category"
                        clear={clearErrors}
                        className="select-area"
                        containerClass="head-add"
                        inputReset={inputReset}
                    />
                    <Input
                        label="Text"
                        type="textarea"
                        placeholder=""
                        name="article.text"
                        register={register}
                        require={true}
                        errors={errors && errors.article?.text ? errors.article.text : null}
                        message="Minimum text length is 100 characters."
                        clear={clearErrors}
                        className="text-area"
                        containerClass="text-add"
                        inputReset={inputReset}
                    />
                    <Button variant={baseImage ? "success" : "warning"} className="upload-photo" onClick={uploadClick}>Upload a photo</Button>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept=".jpeg, .png, .jpg"
                        style={{ display: 'none' }}
                        ref={hiddenFileInput}
                        onChange={(e) => convertImage(e)}
                    />
                    <Button type='submit'>Post Article</Button>
                </form>
            </div>
        </div>
    )
}

export default AddArticlePage;