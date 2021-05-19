import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DropdownNavigator.scss';

const DropdownNavigator = ({ paths, className }) => {

    const [activePage, setActivePage] = useState('Select...');

    const history = useHistory();

    const menu = paths.map((path) => (<Dropdown.Item key={path.name} onClick={() => {
        setActivePage(path.name);
        history.push(path.link);
    }}>
        <FontAwesomeIcon icon={path.icon} style={{ marginRight: '20px' }} /> {path.name}
    </Dropdown.Item>))


    return (
        <DropdownButton className={className} menuAlign="right" variant="light" id="dropdown-menu-align-right" title={activePage}>
            {menu}
        </DropdownButton>
    )
}

export default DropdownNavigator;