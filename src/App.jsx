import { HashRouter, Routes, Route } from "react-router-dom";
import { Purchases, Home, Login, ProductDetail } from "./pages";
import { LoadingScreen, NavBar } from "./components";
import {useSelector} from "react-redux";
import {Container} from "react-bootstrap";

function App() {

  const isLoading = useSelector(state => state.isLoading);
  return (
    <HashRouter>
      <NavBar />
      { isLoading && <LoadingScreen/> }
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;