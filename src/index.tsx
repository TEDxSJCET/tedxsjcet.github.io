/* @refresh reload */
import { render } from 'solid-js/web';

import "cal-sans";

import App from './App';
import ComponentsOnly from './components';
import './index.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
    );
}

render(() => import.meta.env.MODE === "components" ? <ComponentsOnly /> : <App />, root!);
