export const ownerNavItems: { to: string, label: string, exactPath: boolean }[] = [
    { to: "/owner", label: "Dashboard", exactPath: true },
    // { to: "/owner/competitions", label: "Competitions", exactPath: false },
    { to: "/owner/my-courts", label: "My Courts", exactPath: false },
    { to: "/owner/bookings", label: "Bookings", exactPath: false },
    { to: "/owner/profile", label: "Profile", exactPath: false },
];

export const playerNavItems: { to: string, label: string, exactPath: boolean }[] = [
    { to: "/player", label: "Dashboard", exactPath: true },
    { to: "/player/competitions", label: "Competitions", exactPath: false },
    { to: "/player/my-team", label: "My Team", exactPath: false },
    { to: "/player/my-stats", label: "My Stats", exactPath: false },
    { to: "/player/profile", label: "Profile", exactPath: false },
];

export const hostNavItems: { to: string, label: string, exactPath: boolean }[] = [
    { to: "/host", label: "Dashboard", exactPath: true },
    { to: "/host/competitions", label: "Competitions", exactPath: false },
    { to: "/host/profile", label: "Profile", exactPath: false },
];
