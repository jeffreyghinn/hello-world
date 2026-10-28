import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Link to stylesheet
import './styles.css';
import App from './App.jsx';

function setEmojiFavicon(emoji) {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    ctx.font = `${size * 0.8}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, size / 2, size / 2 + size * 0.06);

    const icon = document.querySelector('link[rel="icon"]') ?? document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/png';
    icon.href = canvas.toDataURL('image/png');
    document.head.appendChild(icon);
}

setEmojiFavicon('\u{1F44B}');

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
