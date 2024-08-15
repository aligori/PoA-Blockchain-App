import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '@/assets/css/index.css';
import { persistor, store } from '@/redux/store';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>
);
