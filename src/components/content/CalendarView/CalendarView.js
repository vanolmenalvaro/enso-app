import React from 'react';
import Calendar from './Calendar'


function CalendarView(props) {

  return (
    <div {...props}>
        <Calendar />
        {/* trainingview on the right half of the screen on big screens */}
    </div>
  );
}

export default CalendarView;
