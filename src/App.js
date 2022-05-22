import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import { Container } from "@mui/material";
import Header from "./components/header/Header"
import Movies from "./pages/movies/Movies";
import MovieDetail from "./pages/movieDetail/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
