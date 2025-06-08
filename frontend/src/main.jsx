import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistor, store } from './redux/store.js'; // Import store dan persistor
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* Menambahkan PersistGate */}
      <BrowserRouter basename="/tour-frontend">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
