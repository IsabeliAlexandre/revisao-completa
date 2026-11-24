
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientePage from './pages/ClientesPage';
import LoginPage from './pages/LoginPage';
import VeiculosPage from './pages/VeiculosPage';
import AgendamentosPage from './pages/AgendamentosPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/clientes" element={<ClientePage />} />
                <Route path="/veiculos" element={<VeiculosPage />} />
                <Route path="/agendamentos" element={<AgendamentosPage />} />
                
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
