import { useState, useCallback, useEffect } from 'react';
import type { MarqueeConfig } from '../types/marquee';

const DEFAULT_CONFIG: MarqueeConfig = {
  text: '歡迎使用跑馬燈工具！',
  fontSize: 48,
  textColor: '#000000',
  backgroundColor: '#ffffff',
  speed: 5,
  direction: 'left',
  isPlaying: true,
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 'normal',
  fontStyle: 'normal',
  hasTextShadow: false,
  hasBorder: false,
  borderColor: '#000000',
  isFullscreen: false,
};

export const useMarquee = () => {
  const [config, setConfig] = useState<MarqueeConfig>(() => {
    try {
      const saved = localStorage.getItem('marquee-config');
      return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const updateConfig = useCallback((newConfig: Partial<MarqueeConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      try {
        localStorage.setItem('marquee-config', JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save config to localStorage:', error);
      }
      return updated;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem('marquee-config');
    } catch (error) {
      console.warn('Failed to remove config from localStorage:', error);
    }
  }, []);

  const enterFullscreen = useCallback(async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        updateConfig({ isFullscreen: true });
      }
    } catch (error) {
      console.warn('Failed to enter fullscreen:', error);
    }
  }, [updateConfig]);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
        updateConfig({ isFullscreen: false });
      }
    } catch (error) {
      console.warn('Failed to exit fullscreen:', error);
    }
  }, [updateConfig]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setConfig(prev => ({ ...prev, isFullscreen }));
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.fullscreenElement) {
        e.preventDefault();
        updateConfig({ isPlaying: !config.isPlaying });
      }
      if (e.code === 'Escape' && document.fullscreenElement) {
        exitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [config.isPlaying, updateConfig, exitFullscreen]);

  return {
    config,
    updateConfig,
    resetConfig,
    enterFullscreen,
    exitFullscreen,
  };
};