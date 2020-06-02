import React from 'react';

const Input = ({ handleInput, type, label, labelColor, content, contentAlignment }) => {
    return (
        <div className={`textfield-wrapper ${content}`} style={{ color: labelColor, alignItems: contentAlignment }}>
            <label>{label}</label>
            <input onChange={handleInput} className="textfield" type={type} name={type} />
        </div>
    )
}

export default Input;