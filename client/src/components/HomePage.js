import React from 'react';
import Navigation from './Navigation';
import LoggedInControls from './LoggedInControls';
import Editor from './Editor';
import Calendar from './Calendar/Calendar';
import '../sass/homepage.scss';

const HomePage = () => {

    return (
        <div>
            <Navigation>
                <LoggedInControls />
            </Navigation>
            <div className="homepage">
                <div className="editor-section">
                    <div className="editor-wrapper">
                        <h1>You are on a streak of day this</h1>
                        <h2>{new Date().toDateString()}</h2>
                        <Editor />
                    </div>
                </div>
                <div className="ui-controls">
                    <Calendar />
                </div>
            </div>
        </div>
    )
}

export default HomePage;