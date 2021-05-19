import React from 'react';
import { Pagination } from 'react-bootstrap';

import './Paginator.scss';

const Paginator = ({ currentPage, pages, changeCurrentPage }) => {

    const changePagination = (e) => {
        const { id } = e.target;

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        switch (id) {
            case "first":
                changeCurrentPage(1);
                break;
            case "prev":
                changeCurrentPage(prevState => prevState - 1);
                break;
            case "next":
                changeCurrentPage(prevState => prevState + 1);
                break;
            case "last":
                changeCurrentPage(Number(pages));
                break;
            default:
                changeCurrentPage(Number(id));
                break;
        };
    };

    const items = [];
    if (pages > 2) {
        for (let i = 2; i < pages; i++) {
            items.push(
                <Pagination.Item key={i} id={i} active={i === currentPage} onClick={e => changePagination(e)} >
                    {i}
                </Pagination.Item>
            );
        }
    };


    return (
        <div className="pagination-interface">
            <Pagination>
                <Pagination.First disabled={currentPage === 1} id="first" onClick={e => changePagination(e)} />
                <Pagination.Prev disabled={currentPage === 1} id="prev" onClick={e => changePagination(e)} />
                <Pagination.Item id={1} active={currentPage === 1} onClick={e => changePagination(e)} >{1}</Pagination.Item>
                {currentPage > 2 ? <Pagination.Ellipsis disabled /> : null}
                {items.slice(currentPage === 1 ? 0 : currentPage === 2 ? currentPage - 2 : currentPage - 3, currentPage + 1)}
                {currentPage < pages - 2 ? <Pagination.Ellipsis disabled /> : null}
                {pages > 1 ? <Pagination.Item id={pages} active={currentPage === pages} onClick={e => changePagination(e)} >{pages}</Pagination.Item> : null}
                <Pagination.Next disabled={currentPage === pages} id="next" onClick={e => changePagination(e)} />
                <Pagination.Last disabled={currentPage === pages} id="last" onClick={e => changePagination(e)} />
            </Pagination>
        </div>
    )
}

export default Paginator;