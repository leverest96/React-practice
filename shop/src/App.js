import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import data from "./data.js";

// import Cart from "./pages/Cart.js";
// import Detail from "./pages/Detail.js";

const Detail = lazy(() => import("./pages/Detail.js"));
const Cart = lazy(() => import("./pages/Cart.js"));

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  });

  let [shoes, setSheos] = useState(data);
  let [leftover] = useState([10, 11, 12]);

  let navigate = useNavigate();

  let result = useQuery("userdata", () =>
    axios.get(`https://codingapple1.github.io/userdata.json`).then((a) => {
      return a.data;
    })
  );

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Details</Nav.Link> */}
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈 </Link>
      <Link to="/detail">상세페이지</Link>

      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>

                <div className="container">
                  <div className="row">
                    {shoes.map((a, i) => {
                      return <Card shoes={a} i={i + 1}></Card>;
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    axios
                      .get("https://codingapple1.github.io/shop/data3.json")
                      .then((res) => {
                        let copy = [...shoes, ...res.data];
                        setSheos(copy);
                      });
                  }}
                >
                  더보기
                </button>
              </>
            }
          />

          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>위치정보임</div>} />
          </Route>

          <Route path="*" element={<div>없는 페이지</div>} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function About(props) {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
