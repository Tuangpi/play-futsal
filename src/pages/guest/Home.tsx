import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Find & Play Futsal Near You</h1>
        <p className="text-lg mb-8">
          Book courts, join tournaments, and track your game — all in one place.
        </p>
        <div className="space-x-4">
          <Link to="/competitions" className="bg-primary px-6 py-2 rounded">
            Explore Competitions
          </Link>
          <Link to="/signup" className="border px-6 py-2 rounded">
            Sign Up
          </Link>
        </div>
      </section>
      <section className="py-16 px-4 text-center bg-secondary">
        <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          <div>⏱ Book a Court</div>
          <div>🏆 Join a Tournament</div>
          <div>📊 Track Your Progress</div>
        </div>
      </section>

      <footer className="text-center py-6 text-text-muted bg-text border-t border-text-muted">
        &copy; 2025 FutsalPro. All rights reserved.
      </footer>
    </>
  );
};

export default Home;
