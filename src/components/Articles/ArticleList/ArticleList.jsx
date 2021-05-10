import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './ArticleList.scss';
import defaultNews from '../../../images/default/defaultNews.jpg';

const ArticleList = ({ category, created, picture, text, title, user, _id }) => {
    const history = useHistory();

    const sliceText = (text) => {
        if (text.length <= 1000) {
            return text
        } else if (text.length > 1000) {
            const newText = text.slice(0, 1000);
            return `${newText} ...`
        }
    }

    return (
        <article className="article-preview-container">
            <div className="article-preview-header">
                <h3>{title}</h3>
                <p className="article-preview-date">{created.replaceAll('-', '/').replace('T', ' ').split('.')[0]}</p>
                <p className="article-preview-info"><span style={{ fontStyle: 'italic' }}>created by:</span> {user} | <span style={{ fontStyle: 'italic' }}>category:</span> {category}</p>
            </div>
            <div className="article-preview-content clearfix">
                <img src={picture ? picture : defaultNews} alt="news-image" />
                <p className="article-preview-text">{sliceText(text)}</p>
            </div>
            <div className="article-preview-footer">
                <Button variant="info" onClick={() => history.push(`/articles/${_id}`)}>Read the Article</Button>
            </div>
        </article>
    )
}

export default ArticleList;