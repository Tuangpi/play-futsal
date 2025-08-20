import { useState } from "react";
import TableView from "./TableView";
import CalendarView from "./CalendarView";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<"calendar" | "table">("calendar");

  const bookings = [
    {
      id: "#B-1023",
      court: "Court A",
      dateTime: "Aug 20, 6PM–8PM",
      player: "John Doe",
      status: "Confirmed",
      payment: "Paid",
      actions: "View",
    },
    {
      id: "#B-1024",
      court: "Court B",
      dateTime: "Aug 21, 4PM–6PM",
      player: "Alex Lee",
      status: "Pending",
      payment: "Unpaid",
      actions: "Approve / Reject",
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 -mb-px border-b-2 font-medium ${
            activeTab === "calendar"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
        <button
          className={`px-4 py-2 -mb-px border-b-2 font-medium ${
            activeTab === "table"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("table")}
        >
          Table
        </button>
      </div>

      {/* Calendar View */}
      {activeTab === "calendar" && (
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <CalendarView />
        </div>
      )}

      {/* Table View */}
      {activeTab === "table" && <TableView bookings={bookings} />}
    </div>
  );
};

export default Bookings;
