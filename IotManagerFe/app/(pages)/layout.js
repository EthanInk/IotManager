import Provider from "@/components/Provider";
import "@/app/globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function NavLayout({ children }) {
  return (
    <>
      <Provider>
        <NavBar />
        {children}
      </Provider>
    </>
  );
}
