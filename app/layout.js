import "../app/globals.css"; // your Tailwind + global styles
import Navbar from "./Components/Nav/Navbar";
import Footer from "./Components/Footer/Footer";

export const metadata = {
  title: "ProEssay | Professional Assignment Writing Service",
  description: "Get expert help with assignments, essays, and academic writing. Trusted by students worldwide.",
  keywords: "Urgent Homework, Essay writers, pay for dissertation, pay for research paper, pay for thesis, personal statement writing service, persuasive essay writing service, Powerpoint presentation writing services, rewrite my essay, scholarship essay writing service, speech writing services, write essays for money, write my argumentative essay, coursework help, coursework writing service, descriptive essay writing service, dissertation proposal writing service, do my assignment, do my coursework, edit my essay, essay for sale, expository essay writing service, literature review writing service, order essay, capstone project writing service, case study writing service, admission essay writing service, analytical essay writing service, apa paper writing service, argumentative essay writing service, book report writing service, Plagiarism checker, Remove ai from my essay, research paper Writing, College essay writing",
  openGraph: {
    title: "ProEssay | Professional Assignment Writing Service",
    description: "Get expert help with assignments, essays, and academic writing.",
    url: "https://proessay.com",
    siteName: "ProEssay",
    images: [
      {
        url: "/public/logo.png",
        width: 800,
        height: 600,
        alt: "ProEssay Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProEssay | Professional Assignment Writing Service",
    description: "Get expert help with assignments, essays, and academic writing.",
    images: ["/public/logo.png"],
  },
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
