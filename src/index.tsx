import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import HomePage from './ui/home/HomePage';
import reportWebVitals from './reportWebVitals';
import {
  Navigate,
  Route, Routes,
  BrowserRouter,
} from "react-router-dom";
import LoginPage from './ui/login/LoginPage';
import PrivateRoute from './ui/widget/PrivateRoute';
import './util/MultiLang';
import { StyledEngineProvider } from '@mui/material/styles';
import LoadingOverlay from './ui/widget/LoadingOverlay';
import { AppContextProvider } from './context/AppContext';
import DashBoard from './ui/home/dashboard/DashBoard';
import ContentManagement from './ui/home/content-management/ContentManagement';
import MembershipManagement from './ui/home/membership-management/MembershipManagement';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AppContextProvider>
        <LoadingOverlay />
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />} >
              <Route path='/' element={<HomePage />} >
                <Route path='dashboard' element={<DashBoard />} />
                <Route path='membership-management' element={<MembershipManagement />} />
                <Route path='content-management' element={<ContentManagement />} />
                <Route index element={<Navigate to='dashboard' />}/>
              </Route>
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
