import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <LandingPage />
      </div>
      <Header />
    </div>
  );
}