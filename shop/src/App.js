import './App.css';
import { createContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js';
import data from './data.js';
import axios from 'axios';

// context(state 보관함)를 하나 만들어주는 녀석
export let Context1 = createContext();


function App() {
  let [shoes, setSheos] = useState(data);
  let [leftover] = useState([10, 11, 12]);

  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Details</Nav.Link> */}
            <Nav.Link onClick={() => { navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈 </Link>
      <Link to="/detail">상세페이지</Link>

      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>

            <div className="container">
              <div className="row">
                {
                  shoes.map((a, i) => {
                    return (
                      <Card shoes={ a } i={ i + 1 }></Card>
                    )
                  })
                }
                
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data3.json')
              .then((res) => {
                let copy = [...shoes, ...res.data];
                setSheos(copy);
              })
            }}>더보기</button>
          </>
        } />

        <Route path="/detail/:id" element={
          <Context1.Provider value={{ leftover }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"} width="80%" />
      <h5>{ props.shoes.title }</h5>
      <p>{ props.shoes.price }</p>
    </div>
  )
}

function About(props) {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
