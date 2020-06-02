import React from "react";
import DateItemsPerRow from "./DateItemsPerRow";

// find days in a month
function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// returns day number from 0-sunday to 6-saturday
const monthStartedWithDay = (year, month) => {
  return new Date(year, month - 1).getDay();
};

// returns array of integer values, with empty spots at the beginning
// if provided a value
const getListOfValuesPerRow = (start, end, emptySpots = 0) => {
  let arr = [];
  if (emptySpots !== 0) {
    for (let spot = 0; spot < emptySpots; spot++) {
      arr.push(" ");
    }
  }

  for (let item = start; item <= end; item++) {
    arr.push(item);
  }
  return arr;
};

const Month = ({ month, year }) => {
  // row 1
  const weekLength = 7;
  let startOfRow = 1;
  let endOfRow = weekLength - monthStartedWithDay(year, month);
  let rowIncrement = weekLength;
  const daysMissedInFirstRow = weekLength - endOfRow;
  const row1 = getListOfValuesPerRow(
    startOfRow,
    endOfRow,
    daysMissedInFirstRow
  );

  // row 2
  startOfRow = endOfRow + 1;
  endOfRow += rowIncrement;
  const row2 = getListOfValuesPerRow(startOfRow, endOfRow);

  // row 3
  startOfRow = endOfRow + 1;
  endOfRow += rowIncrement;
  const row3 = getListOfValuesPerRow(startOfRow, endOfRow);

  // row 4
  startOfRow = endOfRow + 1;
  endOfRow += rowIncrement;
  const row4 = getListOfValuesPerRow(startOfRow, endOfRow);

  // row 5
  startOfRow = endOfRow + 1;
  rowIncrement =
    daysMissedInFirstRow > 4 ? 7 : daysInMonth(year, month) - endOfRow;
  endOfRow += rowIncrement;
  const row5 = getListOfValuesPerRow(startOfRow, endOfRow);

  // row 6
  rowIncrement = daysInMonth(year, month) - endOfRow;
  startOfRow = endOfRow + 1;
  endOfRow += rowIncrement;
  const row6 = getListOfValuesPerRow(startOfRow, endOfRow);

  return (
    <tbody className="days-in-month-box">
      <DateItemsPerRow list={row1} month={month} year={year} />
      <DateItemsPerRow list={row2} month={month} year={year} />
      <DateItemsPerRow list={row3} month={month} year={year} />
      <DateItemsPerRow list={row4} month={month} year={year} />
      <DateItemsPerRow list={row5} month={month} year={year} />
      <DateItemsPerRow list={row6} month={month} year={year} />
    </tbody>
  );
};

export default Month;
