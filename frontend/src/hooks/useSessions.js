import { useState, useCallback, useRef, useEffect } from 'react';

const STORAGE_KEY = 'koki-sessions';

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function loadSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {}
}

export function createSession(title) {
  return {
    id: generateId(),
    title: title || 'Resep Baru',
    messages: [],
    lastIngredients: null,
    createdAt: Date.now(),
  };
}

export default function useSessions() {
  const [sessions, setSessions] = useState(() => {
    const loaded = loadSessions();
    if (loaded.length === 0) {
      return [createSession()];
    }
    return loaded;
  });
  const [activeId, setActiveId] = useState(() => sessions[0]?.id || null);

  const sessionsRef = useRef(sessions);
  useEffect(() => { sessionsRef.current = sessions; }, [sessions]);
  useEffect(() => { saveSessions(sessions); }, [sessions]);

  const setActiveIdSafe = useCallback((id) => {
    if (sessionsRef.current.find((s) => s.id === id)) {
      setActiveId(id);
    }
  }, []);

  const addSession = useCallback((title) => {
    const session = createSession(title);
    setSessions((prev) => [...prev, session]);
    setActiveId(session.id);
    return session.id;
  }, []);

  const deleteSession = useCallback((id) => {
    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      if (filtered.length === 0) {
        const newSession = createSession();
        setActiveId(newSession.id);
        return [newSession];
      }
      return filtered;
    });
  }, []);

  const deleteAllSessions = useCallback(() => {
    const newSession = createSession();
    setSessions([newSession]);
    setActiveId(newSession.id);
  }, []);

  const updateSession = useCallback((id, partial) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, ...partial } : s)));
  }, []);

  const activeSession = sessions.find((s) => s.id === activeId) || sessions[0] || null;

  return {
    sessions,
    activeId: activeSession?.id || null,
    activeSession,
    setActiveId: setActiveIdSafe,
    addSession,
    deleteSession,
    deleteAllSessions,
    updateSession,
  };
}
