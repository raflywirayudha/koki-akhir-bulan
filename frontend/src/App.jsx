import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './routes/Landing';
import Chat from './routes/Chat';

function BackgroundDecor() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="bg-grid-dot absolute inset-0" />
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen text-foreground font-body transition-colors duration-200">
      <div className="fixed inset-0 bg-background -z-20" />
      <BackgroundDecor />
      <Navbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/chat"
          element={
            <Chat
              sidebarOpen={sidebarOpen}
              onCloseSidebar={() => setSidebarOpen(false)}
              onToggleSidebar={() => setSidebarOpen((v) => !v)}
            />
          }
        />
      </Routes>
    </div>
  );
}
