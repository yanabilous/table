import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Table from "./pages/Table.jsx";

function App() {
  return (
      <Router basename={'/table'}>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="table" element={<Table/>}/>
        </Routes>
      </Router>
  );
}

export default App;
