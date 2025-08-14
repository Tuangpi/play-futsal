import { useLayoutEffect } from "react";

const Courts = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return <div className="min-h-screen">Courts</div>;
};

export default Courts;
