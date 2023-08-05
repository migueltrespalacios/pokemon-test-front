import { Container, Col, Row } from "react-bootstrap";
import Register from "./Register";
import Login from './Login';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./Account";
import PokemonComponent from "./Pokemon";
import AuthComponent from "./AuthComponent";
import Protected from "./ProtectedRoutes";
import Cookies from "universal-cookie";
import PokemonDetailComponent from "./PokemonDetails";
const cookies = new Cookies();

function App() {
  const token = cookies.get("TOKEN");
  return (
    <Container>
      <Row>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/pokemon" element={<Protected isSignedIn={token ? true : false}>
            <PokemonComponent />
          </Protected>} />
          <Route exact path="/detail" element={
            <PokemonDetailComponent />
          } />
          <Route path="/auth" element={<Protected isSignedIn={token ? true : false}>
            <AuthComponent />
          </Protected>} />
        </Routes>
      </Row>
    </Container>
  );
}

export default App;