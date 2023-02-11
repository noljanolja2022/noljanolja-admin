import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './ui/dashboard/DashboardPage';
import reportWebVitals from './reportWebVitals';
import {
  Navigate,
  Route, Routes,
  BrowserRouter,
} from "react-router-dom";
import LoginPage from './ui/login/LoginPage';
import PrivateRoute from './ui/widget/PrivateRoute';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />} >
          <Route path='/' element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
