import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import LoggedInControls from './LoggedInControls';
import '../sass/track.scss';

const ListItem = ({ words, wordsCount, date }) => {

    const [toggleText, setToggleText] = useState(false);

    const _toggleText = e => {
        setToggleText(!toggleText);
    }

    return (
        <div className="list-item">
            <div className="heading-section">
                <p className="heading-text">{wordsCount} written on {new Date(date).toDateString()}</p>
                <div onClick={_toggleText} className={`collapse ${toggleText ? 'rotate' : ''}`}>
                    <svg className="icon" width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d)">
                            <path d="M13.2819 15.0193C12.8816 15.5214 12.1184 15.5214 11.7181 15.0193L1.23696 1.8734C0.714712 1.21837 1.18112 0.249998 2.01886 0.249998L22.9811 0.25C23.8189 0.25 24.2853 1.21838 23.763 1.8734L13.2819 15.0193Z" fill="#FFFAFA" />
                        </g>
                        <defs>
                            <filter id="filter0_d" x="0.0169678" y="0.25" width="24.966" height="20.1459" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="0.5" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>
            <p className={`body-text ${toggleText ? 'visible' : ''}`}>
                {words}
            </p>
        </div>
    )
}

const List = ({ writings }) => {
    return (
        <div className="list">
            {writings.map((item, index) => <ListItem key={index} words={item.words} wordsCount={item.wordsCount} date={item.date} />)}
        </div>
    )
}

const Track = () => {

    const [allWritings, setAllWritings] = useState(null)

    useEffect(() => {
        fetch('/api/allwritings', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(result => {
                setAllWritings(result);
            })

    }, []);

    const calculateTotalWordsCount = (writings) => {
        return writings.reduce((totalWordsWritten, writingInstance) => {
            totalWordsWritten += writingInstance.wordsCount;
            return totalWordsWritten;
        }, 0)
    }

    return (
        <div>
            <Navigation>
                <LoggedInControls />
            </Navigation>
            <div className="track-section">
                <div className='track-heading'>
                    <h1>
                        Writing's Timeline
                    </h1>
                    <p>You wrote {allWritings ? calculateTotalWordsCount(allWritings[0].writings) : ''} words so far.</p>
                </div>
                {allWritings ?
                    <List
                        writings={allWritings[0].writings}
                    /> : ''
                }
            </div>
        </div>
    )
}

export default Track;