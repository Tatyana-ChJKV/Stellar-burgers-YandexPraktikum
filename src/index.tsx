import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export function getIngredients() {
    const API = 'https://norma.nomoreparties.space/api/ingredients';
    return fetch(API)
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
        .catch(error => console.log(error))
}

getIngredients()