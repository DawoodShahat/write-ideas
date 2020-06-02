import React, { useEffect, useState, useRef } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import fetchData from '../api/fetchData';

function getDetailedDate(dateStr) {
    const date = !dateStr ? new Date() : new Date(dateStr);
    return {
        month: date.getMonth(),
        day: date.getDay(),
        dateNumber: date.getDate(),
        year: date.getFullYear()
    }
}

function dateMatches(date, date1) {
    return date1.month === date.month && date1.day === date.day && date1.dateNumber === date.dateNumber && date1.year === date.year;
}

// Editor Component
const Editor = () => {

    const textElm = useRef(null);
    const [text, setText] = useState('');
    const [wordsCount, setWordsCount] = useState(0);
    const [newDay, setNewDay] = useState(false);

    const [editorStyling, setEditorStyling] = useState({ fontSize: '', fontFamily: '', backgroundColor: '#fff' })

    // returns a boolean based on userId existence in localStorage object
    const _doesWritingIdExist = (id) => {
        return localStorage.getItem('todaysWritingId') === "undefined" || localStorage.getItem('todaysWritingId') === null ? false : true;
    }

    const useDidMount = () => {
        const [isMount, setIsMount] = useState(false);
        useEffect(() => {
            setIsMount(true);
        }, []);
        return isMount;
    };

    const isMount = useDidMount();

    // get user's writing of the day
    useEffect(() => {

        const todaysWritingId = localStorage.getItem('todaysWritingId');

        const endpoint = _doesWritingIdExist(todaysWritingId) ? `/${todaysWritingId}` : '';
        console.log('endpoint', endpoint);

        // make a request becuase writng id does not exist
        fetch(`/api/writings/${endpoint}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(result => {

                // update todaysWritingId in localStorage
                localStorage.setItem('todaysWritingId', result._id);
                console.log(localStorage);

                // if some words written earlier during the day
                const { words, wordsCount } = result;
                if (words && wordsCount) {
                    setText(result.words);
                    setWordsCount(result.wordsCount);
                }

                const currentDate = getDetailedDate(null);
                const writingInstanceDate = getDetailedDate(result.date);

                // check if the day changed
                if (!dateMatches(currentDate, writingInstanceDate)) {
                    localStorage.clear();
                    setText('');
                    setWordsCount(0);
                    setNewDay(!newDay);
                }
            })

        textElm.current.focus();

    }, [newDay]);

    // after the first render
    useEffect(() => {
        if (isMount) {
            // /\w+/g works globally, text.split(" ") does not work on a new line 
            const wordsList = text.match(/\w+/g);
            const validWords = !wordsList ? [] : wordsList.filter(word => word.length > 0);
            setWordsCount(validWords.length);
        }
    }, [text]);

    // fetch editor styling, runs only once the component is mounted
    useEffect(() => {
        const fetchCustomStyling = async () => {
            const response = await fetch('/api/customstyling/', {
                method: 'GET',
                credentials: 'include'
            });

            const result = await response.json();
            const { fontSize, fontFamily, backgroundColor } = result[0];
            setEditorStyling({ fontSize, fontFamily, backgroundColor });

        }

        fetchCustomStyling();

    }, [])

    const _editorinput = e => {
        const words = e.target.value;
        setText(words);
    }

    const _saveText = async () => {
        const result = await fetchData('/api/savewritings', { words: text, wordsCount: wordsCount, todaysWritingId: localStorage.todaysWritingId })
    }

    return (
        <div className="editor">
            <TextareaAutosize onChange={_editorinput} style={editorStyling} value={text} ref={textElm} placeholder="Write Here..." />
            <div className="editor-footer">
                <p>{wordsCount} words</p>
                <button onClick={_saveText}>Save</button>
            </div>

        </div>
    )
}

export default Editor;