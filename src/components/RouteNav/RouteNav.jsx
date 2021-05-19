import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './RouteNav.scss';

const RouteNav = ({ paths }) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const menu = paths.map((path, index) => <NavLink key={index} to={path.link} exact={path.exact} onClick={() => scrollToTop()}><FontAwesomeIcon icon={path.icon} style={{ marginRight: '20px' }} />{path.name}</NavLink>)

    return (
        <div className="routenav-background">
            {menu}
        </div>
    )
}

export default RouteNav;