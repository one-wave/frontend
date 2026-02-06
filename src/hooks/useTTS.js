import { useState, useRef, useCallback } from "react";

export default function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const play = useCallback((url) => {
    stop();
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setIsSpeaking(false);
    audio.onerror = () => setIsSpeaking(false);
    audio.play();
    setIsSpeaking(true);
  }, [stop]);

  const toggle = useCallback((url) => {
    isSpeaking ? stop() : play(url);
  }, [isSpeaking, stop, play]);

  return { play, stop, toggle, isSpeaking };
}
