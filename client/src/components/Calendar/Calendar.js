import React, { useState } from "react";
import ChangeMonthPanel from "./ChangeMonthPanel";
import WeekDaysNames from "./WeekDaysNames";
import Month from "./Month";
import "../../sass/calendar.scss";

// days names
const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// month names
const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const Calendar = (props) => {
  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const _previousMonth = (e) => {
    const { month, year } = currentDate;
    if (month === 1) {
      setCurrentDate({ year: year - 1, month: 12 });
    } else {
      setCurrentDate({ ...currentDate, month: month - 1 });
    }
  };

  const _nextMonth = (e) => {
    const { month, year } = currentDate;
    if (month % 12 === 0) {
      setCurrentDate({ year: year + 1, month: 1 });
    } else {
      setCurrentDate({ ...currentDate, month: month + 1 });
    }
  };

  return (
    <table className="calendar">
      <thead>
        <ChangeMonthPanel
          _previousMonth={_previousMonth}
          _nextMonth={_nextMonth}
          date={`${months[currentDate.month - 1]} ${currentDate.year}`}
        />
        <WeekDaysNames days={listOfDays} />
      </thead>
      <Month month={currentDate.month} year={currentDate.year} />
    </table>
  );
};

export default Calendar;
