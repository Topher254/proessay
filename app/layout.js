import "../app/globals.css"; // your Tailwind + global styles
import Navbar from "./Components/Nav/Navbar";
import Footer from "./Components/Footer/Footer";

export const metadata = {
  title: "Write App",
  description: "Assignment writing app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
