import React, { useEffect, useState, useContext } from 'react';
import fetchData from '../api/fetchData';
import { Link, withRouter } from 'react-router-dom';
import '../sass/loggednav.scss';
import { UserAuthContext } from './UserAuthProvider';

const LoggedInControls = ({ history }) => {

    const [user, setUser] = useState({})

    const context = useContext(UserAuthContext);

    useEffect(() => {
        fetch('/api', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(result => {
                setUser(result.msg[0])
            });
    }, [])

    const _logout = async () => {
        const response = await fetchData('/api/users/logout');
        context._isAuthenticated(false);
        history.push(response.redirectionUrl);
    }

    return (
        <div className="dropdown-nav">
            <div className="dashboard">
                <div className="btn-dashboard">
                    <span>dashboard</span>
                    <button className="drop-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <ul>
                    <li className='dropdown-btn'>
                        <Link to="/track">track</Link>
                    </li>
                    <li className='dropdown-btn'>
                        <Link to="/customize">customize editor</Link>
                    </li>
                </ul>
            </div>
            <div className="user">
                <div className="btn-user">
                    <span>{user.name ? user.name.toLowerCase() : 'dummy user'}</span>
                    <button className="drop-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <ul>
                    <li className='dropdown-btn'>
                        <Link to="/profile">profile</Link>
                    </li>
                    <li className='dropdown-btn'>
                        <Link onClick={_logout} to="#">logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default withRouter(LoggedInControls);