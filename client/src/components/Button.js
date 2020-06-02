import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ handleSubmit, name, link, type }) => {
    return (
        <Link to={link} onClick={handleSubmit} className={`btn ${type}-btn`}>
            {name}
        </Link>
    );
}

export default Button;