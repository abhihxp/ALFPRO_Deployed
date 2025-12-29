import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import LeavesPage from './pages/LeavesPage';
import EmployeesPage from './pages/EmployeesPage'; // Added EmployeesPage


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/leaves" replace />} />
          <Route path="/leaves" element={<LeavesPage />} />
          <Route path="/employees" element={<EmployeesPage />} /> {/* Added Route */}
          {/* Add other placeholders if needed */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
