import React from 'react';
import '../App.scss';
import Navigation from './Navigation';
import LoginControls from './LoginControls';

const LandingPage = () => {
    return (
        <div className="App">
            <Navigation >
                <LoginControls />
            </Navigation>
            <div className="welcome-section">
                <div className="overlay"></div>
                <p className="welcome__msg">
                    Making writing your habit. WriteIdeas is a platform designed to challenge you write everyday by providing a  platform where you can write without any distraction. It also keeps track of your progress and provide statistics about your writing. To make you focused on your work It has a pomodoro productivity tool built in to it.
                </p>
            </div>

        </div>
    )
}

export default LandingPage