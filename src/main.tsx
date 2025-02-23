
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enable React concurrent features
const root = createRoot(document.getElementById("root")!);
root.render(
  <App />
);
