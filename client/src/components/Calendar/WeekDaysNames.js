import React from "react";

const WeekDaysNames = ({ days }) => {
  const daysList = days.map((day, index) => (
    <th key={index} className="week-day-item">
      {day}
    </th>
  ));
  return <tr>{daysList}</tr>;
};

export default WeekDaysNames;
