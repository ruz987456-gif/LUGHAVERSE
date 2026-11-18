import { useCallback, useEffect, useRef, useState } from 'react';

export type SpeechSpeed = 0.75 | 1.0 | 1.2;

export function useArabicAudio() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isRepeating, setIsRepeating] = useState(false);
  const [speed, setSpeed] = useState<SpeechSpeed>(1.0);
  const [hasArabicVoice, setHasArabicVoice] = useState<boolean>(true);
  const [audioNotice, setAudioNotice] = useState<string | null>(null);

  const repeatTimerRef = useRef<number | null>(null);
  const cancelledRef = useRef<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const clearTimers = useCallback(() => {
    if (repeatTimerRef.current !== null) {
      window.clearTimeout(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  }, []);

  const pickArabicVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return null;
    }
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const preferredOrder = ['ar-SA', 'ar-EG', 'ar-AE', 'ar-JO', 'ar'];
    for (const langCode of preferredOrder) {
      const match = voices.find((v) =>
        v.lang.toLowerCase().startsWith(langCode.toLowerCase())
      );
      if (match) return match;
    }
    return null;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setHasArabicVoice(false);
      return;
    }
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const ar = voices.some((v) => v.lang.toLowerCase().startsWith('ar'));
        setHasArabicVoice(ar);
      }
    };
    checkVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', checkVoices);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', checkVoices);
      clearTimers();
      window.speechSynthesis.cancel();
    };
  }, [clearTimers]);

  const playGentleChime = useCallback(() => {
    try {
      const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextCtor();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.14);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // Ignore audio context errors in restricted environments
    }
  }, []);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    clearTimers();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveId(null);
    setIsRepeating(false);
  }, [clearTimers]);

  const speakOnce = useCallback(
    (text: string, rate: number): Promise<void> => {
      return new Promise((resolve) => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
          playGentleChime();
          setAudioNotice('Suara TTS perangkat tidak tersedia; ikuti panduan pelafalan Latin yang tertera.');
          globalThis.setTimeout(resolve, 750);
          return;
        }

        const voice = pickArabicVoice();
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0 && !voice) {
          setAudioNotice('Paket suara Arab di browser belum terpasang. Gunakan Chrome/Android untuk suara Arab penuh, sambil mengikuti pelafalan Latin.');
        } else {
          setAudioNotice(null);
        }

        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = voice?.lang || 'ar-SA';
          if (voice) {
            utterance.voice = voice;
          }
          utterance.rate = rate;
          utterance.pitch = 1.0;

          let settled = false;
          const finish = () => {
            if (!settled) {
              settled = true;
              resolve();
            }
          };

          // Safety timeout in case speechSynthesis hangs without firing onend
          const maxWait = Math.min(8000, Math.max(1500, text.length * 140));
          const guard = globalThis.setTimeout(finish, maxWait);

          utterance.onend = () => {
            globalThis.clearTimeout(guard);
            finish();
          };
          utterance.onerror = () => {
            globalThis.clearTimeout(guard);
            playGentleChime();
            finish();
          };

          window.speechSynthesis.speak(utterance);
        } catch {
          playGentleChime();
          resolve();
        }
      });
    },
    [pickArabicVoice, playGentleChime]
  );

  const play = useCallback(
    async (text: string, id = 'default', customSpeed?: SpeechSpeed) => {
      stop();
      cancelledRef.current = false;
      setActiveId(id);
      setIsRepeating(false);
      await speakOnce(text, customSpeed ?? speed);
      if (!cancelledRef.current) {
        setActiveId(null);
      }
    },
    [speed, speakOnce, stop]
  );

  const playRepeat = useCallback(
    async (text: string, id = 'default', times = 3) => {
      stop();
      cancelledRef.current = false;
      setActiveId(id);
      setIsRepeating(true);

      for (let i = 0; i < times; i++) {
        if (cancelledRef.current) break;
        await speakOnce(text, speed);
        if (cancelledRef.current || i === times - 1) break;
        await new Promise<void>((res) => {
          repeatTimerRef.current = window.setTimeout(res, 550);
        });
      }

      if (!cancelledRef.current) {
        setActiveId(null);
        setIsRepeating(false);
      }
    },
    [speed, speakOnce, stop]
  );

  return {
    activeId,
    isRepeating,
    speed,
    setSpeed,
    hasArabicVoice,
    audioNotice,
    play,
    playRepeat,
    stop,
  };
}
