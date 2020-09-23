import React from "react";

const Input = React.forwardRef(
  (
    {
      handleInput,
      type,
      label,
      labelColor,
      content,
      contentAlignment,
      name,
      // register
    },
    ref
  ) => {
    return (
      <div
        className={`textfield-wrapper ${content}`}
        style={{ color: labelColor, alignItems: contentAlignment }}
      >
        <label>{label}</label>
        <input
          onChange={handleInput}
          className="textfield"
          type={type}
          name={name}
          ref={ref}
        />
      </div>
    );
  }
);

export default Input;
