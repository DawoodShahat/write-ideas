import React from "react";

// whether current Date equals the provided Date
function isTodayDate(date, month, year) {
  const currentDate = new Date();
  return (
    currentDate.getMonth() + 1 === month &&
    currentDate.getFullYear() === year &&
    currentDate.getDate() === date
  );
}

function matchDates(date1, date2) {

}

const DateItemsPerRow = ({ list, month, year }) => {
  let rowList = list.map((rowItem, index) => {
    if (isTodayDate(rowItem, month, year)) {
      return (
        <td className="row-item" style={{ background: "tomato" }} key={index}>
          {rowItem}
        </td>
      );
    } else {
      return (
        <td className="row-item" key={index}>
          {rowItem}
        </td>
      );
    }
  });

  return <tr className="week-body-row">{rowList}</tr>;
};

export default DateItemsPerRow;
