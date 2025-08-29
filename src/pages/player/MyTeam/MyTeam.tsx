import { Link } from "react-router";

type Team = {
  name: string;
  description: string;
  image: string;
};

const teams: Team[] = [
  {
    name: "Phoenix Rising",
    description: "Casual gaming community for various games.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjvr4aK_g12Ch1DNdOEVBDD1TI2sHZRsgBpVtNCwiSo8HoFDPBipWxk3AAL5En6rm0ij1T0Et0QXsCicxWANxJ7KIYfa-ARI-BZur4mHB08jJPy4uRgAjeFn6-uS-Hi7vKRVClOd16cCcqEhB2c5SiNnZ_sg5kVIl5dWWXzfaaYuXoIYALyddTsEDMK4NveH_zA4PssiNl9nbGpk2t7eSFOSIloZyckVhQ983W0_AAkChi4awo3w_98BRvehXdxvWKjyZO5uwydug",
  },
  {
    name: "Shadow Strikers",
    description:
      "Professional team specializing in first-person shooter games.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPRzxoZMNo-No2HtBIJ1EW5myozmLNBhxiaVS_sU0ZATDDs_N88fhm7-SGHAsCgzOPRhRbYHTGO6yN9pBHq-SzDCi9cJoC9XFoA0TcgDT9LEvTMScAFyV1z30kJD_CyHklxukMDWJDTifS8PUdV_O2_qDTsCpw_uornbdYUvfdydOW-KHDdlPRL4lkVLIOFocdZF335-fnTKKJ5gnAk2DJyyza9wWJgqqeFCIvixa8jWG1t1vXPrlGuPV121e1o4JzqDFfSS_ncpo",
  },
];

const MyTeam = () => {
  return (
    <div>
      <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Member Teams
      </h3>
      <Link to="/player/my-team/create">Create Team</Link>

      {teams.map((team, idx) => (
        <div className="p-4" key={idx}>
          <div className="flex items-stretch justify-between gap-4 rounded-lg">
            {/* Left side (info) */}
            <div className="flex flex-[2_2_0px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-white text-base font-bold leading-tight">
                  {team.name}
                </p>
                <p className="text-[#9cabba] text-sm font-normal leading-normal">
                  {team.description}
                </p>
              </div>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#283039] text-white text-sm font-medium leading-normal w-fit">
                <span className="truncate">View Details</span>
              </button>
            </div>

            {/* Right side (image) */}
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
              style={{ backgroundImage: `url(${team.image})` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTeam;
