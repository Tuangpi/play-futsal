import { Link } from "react-router";

const MyCourts = () => {
  // Example court data (will come from API later)
  const courts = [
    {
      id: 1,
      name: "Downtown Futsal Arena",
      location: "Yangon",
      rate: 30,
      status: "Open",
    },
    {
      id: 2,
      name: "Northside Sports Complex",
      location: "Mandalay",
      rate: 25,
      status: "Closed",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courts</h1>
        <Link
          to="/owner/my-courts/add"
          className="bg-sky-500 px-4 py-2 rounded hover:bg-sky-600"
        >
          + Add Court
        </Link>
      </div>

      <table className="w-full border border-gray-800">
        <thead className="bg-gray-900">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Rate (per hour)</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courts.map((court) => (
            <tr key={court.id} className="border-b border-gray-800">
              <td className="p-3">{court.name}</td>
              <td className="p-3">{court.location}</td>
              <td className="p-3">${court.rate}</td>
              <td
                className={`p-3 font-semibold ${
                  court.status === "Open" ? "text-green-400" : "text-red-400"
                }`}
              >
                {court.status}
              </td>
              <td className="p-3 space-x-2">
                <Link
                  to={`/owner/my-courts/${court.id}/edit`}
                  className="text-sky-400 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  to={`/owner/my-courts/${court.id}/bookings`}
                  className="text-yellow-400 hover:underline"
                >
                  View Bookings
                </Link>
                <button className="text-red-400 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCourts;
