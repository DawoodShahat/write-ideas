import React, { useState } from 'react';
import Navigation from './Navigation';
import Form from './Form';

import '../sass/signup.scss';

const SignUp = () => {

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [errors, setErrors] = useState({ errors: [] });

    const _dataLoader = (dataLoaded) => {
        setIsDataLoaded(dataLoaded);
    }

    const _handleErrors = (errors) => {
        setErrors({ errors: errors });
    };


    return (
        <div>
            <div className={isDataLoaded ? 'indicator-wrapper' : ''}>
                <div className={isDataLoaded ? 'show-indicator' : ''}></div>
            </div>
            <Navigation />
            <div className="signup-keypoints-wrapper">
                <div className="signup-wrapper">
                    {errors.errors.length !== 0 ?
                        errors.errors.map((err, index) => (<p style={{ color: 'red' }} key={index}>{err.msg}</p>)) : ''
                    }
                    <h1>Make writing your habit</h1>
                    <h2>Join for free</h2>
                    <Form
                        handleLoadingData={_dataLoader}
                        handleErrors={_handleErrors}
                    />
                </div>
                <div className="keypoints-wrapper">
                    <p className="keypoint-item">
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2L7 14L2 8.54545" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Jot down your thoughts without worrying that other will see it.
                    </p>
                    <p className="keypoint-item">
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2L7 14L2 8.54545" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        It is completely private, you own your writings.
                    </p>
                    <p className="keypoint-item">
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2L7 14L2 8.54545" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        Provides statistics and sentiment analysis for your writings.
                    </p>
                    <p className="keypoint-item">
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2L7 14L2 8.54545" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        Make writing a habit by following the 30 days challenge
                    </p>
                    <p className="keypoint-item">
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2L7 14L2 8.54545" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        Get points and unlock badges to make you feel rewarded.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
