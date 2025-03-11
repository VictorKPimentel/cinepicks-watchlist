import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { ModalProvider } from './context/ModalContext';
import { WatchlistProvider } from './context/WatchlistContext.tsx';
import { UserProvider } from './context/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
    
    <UserProvider>
        <ModalProvider>
            <WatchlistProvider>
                <App />
            </WatchlistProvider>
        </ModalProvider>
    </UserProvider>
)
