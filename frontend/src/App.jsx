import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="py-8">
        <HomeScreen />
      </main>
      <Footer />
    </>
  );
}
