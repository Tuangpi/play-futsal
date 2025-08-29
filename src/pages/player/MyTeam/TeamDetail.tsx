import api from "@/lib/axios";
import type { Team } from "@/types/teams";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";

const getData = async (id: string) => {
  const response = await api.get(`/teams/${id}`);
  return response.data;
};

const TeamDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery<{ data: Team }>({
    queryKey: ["team-detail", id],
    queryFn: () => getData(id ?? ""),
    enabled: !!id,
  });

  const [playerId, setPlayerId] = useState("");
  const [lastInvited, setLastInvited] = useState<string | null>(null);

  const [invitations, setInvitations] = useState([
    { playerId: "Player123", team: "Team Alpha", status: "Pending" },
    { playerId: "Player456", team: "Team Beta", status: "Accepted" },
    { playerId: "Player789", team: "Team Gamma", status: "Declined" },
  ]);

  const handleInvite = () => {
    if (!playerId.trim()) return;

    setInvitations((prev) => [
      ...prev,
      { playerId, team: "Team Alpha", status: "Pending" },
    ]);

    setLastInvited(playerId);
    setPlayerId("");
  };

  const handleResend = (id: string) => {
    console.log(`Resent invite to ${id}`);
  };

  console.log(data);

  const handleCancel = (id: string) => {
    setInvitations((prev) => prev.filter((inv) => inv.playerId !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-bgFrom to-bgTo">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] bg-[#111418] rounded-lg py-5">
        {/* Team Info */}
        <section className="px-4 pb-6">
          <h1 className="text-white text-3xl font-bold">{data?.data.name}</h1>
          <p className="text-[#9cabba] mt-2">Captain: John Doe</p>
          <p className="text-white mt-1">Total Players: 10</p>
        </section>

        {/* Invite Player */}
        <section className="px-4 py-3 border-t border-[#3b4754]">
          <h3 className="text-white text-lg font-bold pb-3">
            Invite Players to Team
          </h3>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4">
            <input
              placeholder="Enter Player ID"
              className="flex-1 rounded-lg text-white border border-[#3b4754] bg-[#1b2127] p-4"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
            />
            <button
              onClick={handleInvite}
              className="bg-[#0d80f2] text-white px-4 py-2 rounded-lg font-bold"
            >
              Send Invite
            </button>
          </div>

          {lastInvited && (
            <p className="text-[#9cabba] text-sm font-normal pt-2">
              Invite Sent to Player ID: {lastInvited}
            </p>
          )}
        </section>

        {/* Sent Invitations */}
        <section className="px-4 py-3 border-t border-[#3b4754]">
          <h3 className="text-white text-lg font-bold pb-3">
            Sent Invitations
          </h3>
          <div className="overflow-hidden rounded-lg border border-[#3b4754]">
            <table className="w-full table-auto">
              <thead className="bg-[#1b2127]">
                <tr>
                  <th className="px-4 py-3 text-left text-white">Player ID</th>
                  <th className="px-4 py-3 text-left text-white">Team</th>
                  <th className="px-4 py-3 text-left text-white">Status</th>
                  <th className="px-4 py-3 text-left text-[#9cabba]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invitations.map((inv, idx) => (
                  <tr key={idx} className="border-t border-[#3b4754]">
                    <td className="px-4 py-2 text-white">{inv.playerId}</td>
                    <td className="px-4 py-2 text-[#9cabba]">{inv.team}</td>
                    <td className="px-4 py-2">
                      <button className="w-full bg-[#283039] text-white py-1 rounded-lg">
                        {inv.status}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-[#9cabba] font-bold space-x-2">
                      {inv.status === "Pending" ? (
                        <>
                          <button onClick={() => handleResend(inv.playerId)}>
                            Resend
                          </button>
                          |
                          <button onClick={() => handleCancel(inv.playerId)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button>View Details</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamDetail;
