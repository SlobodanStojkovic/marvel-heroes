import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import SelectedCharacter from "./pages/SelectedCandidate/SelectedCharacter";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="selectedCharacter" element={<SelectedCharacter />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
