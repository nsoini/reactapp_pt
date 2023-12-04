import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';


export default function Calender({ trainings }) {
 
  if (!Array.isArray(trainings) || trainings.length === 0) {
    return "no data"; 
  }

  const events = trainings.map(({ date, duration, activity, customer }) => ({
    title: activity,
    start: date,
    end: dayjs(date).add(duration, 'minutes').toDate(),
    extendedProps: {
      customer,
    },
  }));


  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth, timeGridWeek, timeGridDay',
        }}
        height={'90vh'}
        events={events}
      />
    </>
  );
}