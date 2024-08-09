import { useEffect } from 'react';

const useBlocker = (blocker) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      blocker();
      event.returnValue = ''; // Required for Chrome to show the warning dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [blocker]);
};

export default useBlocker;
