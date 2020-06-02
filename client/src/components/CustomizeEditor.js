import React, { useState, useEffect } from 'react';
import LoggedInControls from './LoggedInControls';
import Navigation from './Navigation';
import '../sass/customize.scss';
import fetchData from '../api/fetchData';


const DropDown = ({ listitems, handleOnChange, label, selectedItem }) => {
    return (
        <div className="dropdown-label-wrapper">
            <label htmlFor={label}>{label}</label>
            <select id={label} className="drop-down" value={selectedItem} onChange={handleOnChange}>
                {listitems.map((item, index) => <option key={index}>{item}</option>)}
            </select>
        </div>

    )
}

const EditorTemplate = ({ fontsize, fontfamily, backgroundcolor, faintlines }) => {

    const editorTemplate = {
        fontSize: fontsize + 'px',
        fontFamily: fontfamily,
        backgroundColor: backgroundcolor
    }

    return (
        <div className="editor-template" style={editorTemplate}>
            loremMagna duis ullamco elit ea irure id incididunt ex aute. Aute amet elit amet velit velit reprehenderit velit ullamco cillum ut esse deserunt. Laboris duis officia est nisi. Elit minim fugiat minim magna pariatur consectetur et cillum minim nulla do veniam. Quis laborum nisi officia exercitation sit nisi aliqua exercitation in aliqua veniam sunt reprehenderit veniam.

            Commodo esse nisi aliqua cillum sint dolore aliquip. Ipsum aliqua non duis ex deserunt mollit ut nulla excepteur ipsum cillum proident officia. Magna quis magna cillum consectetur quis enim laborum. Culpa do ex ullamco officia aliquip aute fugiat proident aliqua id qui dolore. Magna reprehenderit est dolor cillum magna. Nulla eu pariatur fugiat ullamco dolore dolore ad cillum aliqua ullamco quis. Proident incididunt ut velit irure consectetur laborum eu occaecat aliquip pariatur non ipsum.

            Esse ipsum aliqua sit amet ut sit aliquip Lorem aliqua pariatur. Pariatur labore est exercitation ea adipisicing deserunt nostrud laborum anim proident commodo proident. Eiusmod excepteur velit consequat nulla anim eu aliqua exercitation consequat ut ut. Officia excepteur non eu eiusmod incididunt id pariatur pariatur dolore mollit ea. Irure ea sunt veniam enim nisi adipisicing mollit aliqua voluptate laboris qui aute duis Lorem. Labore veniam do anim ex aliquip.
        </div>
    )
}

const CustomizeEditor = () => {

    const [fontsize, setFontsize] = useState(20);
    const [fontfamily, setFontfamily] = useState('Helvetica, sans-serif');
    const [backgroundColor, setBackgroundColor] = useState('#fff');


    useEffect(() => {
        fetch('/api/customstyling', {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json())
            .then(result => {
                const { fontSize, fontFamily, backgroundColor } = result[0];
                setFontsize(fontSize);
                setFontfamily(fontFamily);
                setBackgroundColor(backgroundColor);
            })

    }, []);


    const _fontSize = e => {
        setFontsize(e.target.value)
    }

    const _fontFamily = e => {
        setFontfamily(e.target.value);
    }

    const _color = e => {
        setBackgroundColor(e.target.value);
    }

    const _save = async () => {
        const customStyling = {
            fontSize: fontsize,
            fontFamily: fontfamily,
            backgroundColor,
        }
        // save this styling to the database 
        // update the styling of the editor
        const result = await fetchData('/api/customstyling', customStyling);
        console.log(result);
    }

    return (
        <div>
            <Navigation>
                <LoggedInControls />
            </Navigation>
            <div className="customize">
                <div className="ui-controls">
                    <DropDown
                        listitems={[20, 14, 16, 22, 12, 18]}
                        handleOnChange={_fontSize}
                        label="Font Size"
                        selectedItem={fontsize}
                    />
                    <DropDown
                        listitems={['Helvetica, sans-serif', 'Comic Sans, Comic Sans MS, cursive', 'Fixed, monospace', 'Courier New, monospace', 'Times New Roman, serif', 'Lucida, sans-serif']}
                        handleOnChange={_fontFamily}
                        label="Font Family"
                        selectedItem={fontfamily}
                    />
                    <label htmlFor="colorpicker">Choose Background Color</label>
                    <input id="colorpicker" value={backgroundColor} type="color" onChange={_color} />
                    <input onClick={_save} id="save-btn" type="button" value="Save" />
                </div>
                <div className="editor-section">
                    <h1>Customize Editor</h1>
                    <EditorTemplate
                        fontsize={fontsize}
                        fontfamily={fontfamily}
                        backgroundcolor={backgroundColor}
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomizeEditor;