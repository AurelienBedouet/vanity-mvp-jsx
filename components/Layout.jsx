import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="font-poppins font-normal">
      <Navbar />
      <main className="max-w-7xl w-[95%] 2xl:w-full mx-auto mt-12">
        {children}
      </main>
    </div>
  );
};

export default Layout;
