import React, { createContext, useContext, useState, useEffect } from 'react';

const ServerContext = createContext(null);

const SERVER_ADDRESS = '45.93.200.7:25613';
const DISPLAY_ADDRESS = 'datacraft.ru-mc.ru';

export function ServerProvider({ children }) {
  const [online, setOnline] = useState(false);
  const [players, setPlayers] = useState({ online: 0, max: 20, list: [] });
  const [version, setVersion] = useState('1.21.8');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.mcstatus.io/v2/status/java/${encodeURIComponent(SERVER_ADDRESS)}`);
        const data = await res.json();
        if (data && typeof data.online === 'boolean') {
          setOnline(data.online);
          setPlayers({
            online: data.players?.online ?? 0,
            max: data.players?.max ?? 20,
            list: (data.players?.list || []).map((p) => (typeof p === 'string' ? p : p.name_clean || p.name_raw || p.name || '')),
          });
          setVersion(data.version?.name_clean || data.version?.name_raw || data.version || '1.21.8');
        } else throw new Error('Invalid response');
      } catch (e) {
        try {
          const fallback = await fetch(`https://api.mcsrvstat.us/2/${SERVER_ADDRESS}`);
          const data = await fallback.json();
          if (data && typeof data.online !== 'undefined') {
            setOnline(data.online);
            setPlayers({
              online: data.players?.online ?? 0,
              max: data.players?.max ?? 20,
              list: (data.players?.list || []).map((p) => (typeof p === 'string' ? p : p.name_clean || p.name_raw || p.name || '')),
            });
            setVersion(typeof data.version === 'string' ? data.version : '1.21.8');
          } else throw new Error('Fallback failed');
        } catch (err) {
          setError(err.message);
          setOnline(false);
          setPlayers({ online: 0, max: 20, list: [] });
        }
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    serverAddress: SERVER_ADDRESS,
    displayAddress: DISPLAY_ADDRESS,
    online,
    players,
    version,
    loading,
    error,
  };

  return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
}

export function useServer() {
  const ctx = useContext(ServerContext);
  if (!ctx) throw new Error('useServer must be used within ServerProvider');
  return ctx;
}
