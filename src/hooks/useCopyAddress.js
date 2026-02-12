import { useState, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

export function useCopyAddress() {
  const [copied, setCopied] = useState(false);
  const showToast = useToast();

  const copy = useCallback(async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      showToast('Адрес сервера скопирован!');
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, [showToast]);

  return { copy, copied };
}
