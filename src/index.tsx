import ReactDOM from 'react-dom/client';
import './style/index.css';
import './util/translation/LanguageUtil';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import App from './ui/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <App/>
    </StyledEngineProvider>
  </BrowserRouter>
);
