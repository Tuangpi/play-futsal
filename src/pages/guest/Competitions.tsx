import { useLayoutEffect } from "react";

const Competitions = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return <div className="min-h-screen">Competitions</div>;
};

export default Competitions;
