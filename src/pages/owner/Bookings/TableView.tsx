const TableView = ({ bookings }: { bookings: any }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Booking ID</th>
            <th className="p-2 border">Court Name</th>
            <th className="p-2 border">Date & Time</th>
            <th className="p-2 border">Player Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Payment</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b: any, idx: any) => (
            <tr key={idx} className="text-center">
              <td className="p-2 border">{b.id}</td>
              <td className="p-2 border">{b.court}</td>
              <td className="p-2 border">{b.dateTime}</td>
              <td className="p-2 border">{b.player}</td>
              <td className="p-2 border">{b.status}</td>
              <td className="p-2 border">{b.payment}</td>
              <td className="p-2 border">
                {b.actions === "View" ? (
                  <button className="px-3 py-1 bg-blue-500 text-white rounded">
                    View
                  </button>
                ) : (
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded">
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableView;
