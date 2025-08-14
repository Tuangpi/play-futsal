import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const RootLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-bg text-text">
        {children}
        <Footer />
      </div>
    </>
  );
};
export default RootLayout;
