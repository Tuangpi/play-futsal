import React from "react";
import BareBoneStatusPage from "./BareBoneStatusPage";
import Spinner from "./Spinner";

const LoadingSplashScreen: React.FC = () => (
  <BareBoneStatusPage>
    <div className="flex flex-col items-center text-center animate-fadeIn">
      <Spinner />
      <h2 className="mt-4 text-xl font-semibold text-text">Loading...</h2>
      <p className="mt-1 text-sm text-text-muted">
        Please wait while we prepare things for you
      </p>
    </div>
  </BareBoneStatusPage>
);

export default LoadingSplashScreen;
