import { StyledEngineProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import buffer from 'buffer';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './style/index.css';
import App from './ui/App';
import './util/translation/LanguageUtil';

window.global ||= window; 
global.Buffer = buffer.Buffer
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);
