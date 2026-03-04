import { useEffect } from 'react';
import { AppState } from 'react-native';

export function useAppStateChangeEffect(callback: any) {
  useEffect(() => {
    let lastCheckTimestamp = 0;

    const onStateChanged = async (initial: any) => {
      const newTimestamp = new Date().valueOf();
      if (newTimestamp - lastCheckTimestamp < 2000) {
        return; // small delay for too frequent requests
      }

      lastCheckTimestamp = newTimestamp;

      callback(initial);
    };

    const listener = AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        onStateChanged();
      }
    });

    onStateChanged(true);

    return () => {
      listener.remove();
    };
  }, []);
}
