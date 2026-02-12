import { useServer } from '../context/ServerContext';

/**
 * Hook returns current online players count and list from ServerContext.
 */
export function useOnlinePlayers() {
  const { players, online, loading } = useServer();
  return {
    count: players.online,
    max: players.max,
    list: players.list,
    online,
    loading,
  };
}
