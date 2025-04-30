import './globals.css';
import Header from '../components/Header';
import Footer from '../components/footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
    <footer className="p-4 border-t text-center text-sm text-gray-500">
      <p>
        <a href="/apply" className="hover:underline hover:text-black">
        </a>
      </p>
    </footer>
  </body>
</html>
  );
}
