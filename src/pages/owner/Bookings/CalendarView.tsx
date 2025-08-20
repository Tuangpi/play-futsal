import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Court A - John Doe",
    start: new Date(2025, 7, 20, 18, 0),
    end: new Date(2025, 7, 20, 20, 0),
    status: "confirmed", // new
  },
  {
    title: "Court B - Alex Lee",
    start: new Date(2025, 7, 21, 16, 0),
    end: new Date(2025, 7, 21, 18, 0),
    status: "pending", // new
  },
];

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">(
    "month"
  );

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        view={currentView}
        onNavigate={(date) => setCurrentDate(date)}
        onView={(view) => setCurrentView(view as "month" | "week" | "day")}
        style={{ height: "100%" }}
        views={["month", "week", "day"]}
        eventPropGetter={(event) => {
          let backgroundColor = "#2563eb"; // default blue

          if (event.status === "confirmed") backgroundColor = "#16a34a"; // green
          if (event.status === "pending") backgroundColor = "#f59e0b"; // yellow
          if (event.status === "cancelled") backgroundColor = "#dc2626"; // red

          return {
            style: {
              backgroundColor,
              color: "white",
              borderRadius: "6px",
              padding: "4px",
            },
          };
        }}
      />
    </div>
  );
};

export default CalendarView;
