import React from "react";

const ChangeMonthPanel = ({ _previousMonth, _nextMonth, date }) => {
  return (
    <tr>
      <td className="back-btn" onClick={_previousMonth}>
        <svg
          style={{ pointerEvents: "none" }}
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6855 5.43414L7.78135 10.3383L12.6855 15.2425"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </td>
      <td align="center" className="month-name" colSpan="5">
        {date}
      </td>
      <td className="next-btn" onClick={_nextMonth}>
        <svg
          style={{ pointerEvents: "none" }}
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.81714 5.43414L12.7213 10.3383L7.81714 15.2425"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </td>
    </tr>
  );
};

export default ChangeMonthPanel;
