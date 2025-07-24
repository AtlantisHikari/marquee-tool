import React, { useEffect, useRef } from 'react';
import type { MarqueeConfig } from '../../types/marquee';
import { cn } from '../../utils/cn';

interface MarqueeDisplayProps {
  config: MarqueeConfig;
  className?: string;
  isFullscreen?: boolean;
}

export const MarqueeDisplay: React.FC<MarqueeDisplayProps> = ({ 
  config, 
  className,
  isFullscreen = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const getAnimationClass = () => {
    switch (config.direction) {
      case 'left':
        return 'animate-marquee';
      case 'right':
        return 'animate-marquee-reverse';
      case 'up':
        return 'animate-marquee-up';
      case 'down':
        return 'animate-marquee-down';
      default:
        return 'animate-marquee';
    }
  };

  const getContainerClass = () => {
    if (config.direction === 'up' || config.direction === 'down') {
      return 'flex flex-col items-center justify-center overflow-hidden';
    }
    return 'marquee-container';
  };

  const textStyles: React.CSSProperties = {
    fontSize: `${config.fontSize}px`,
    color: config.textColor,
    fontFamily: config.fontFamily,
    fontWeight: config.fontWeight || 'normal',
    fontStyle: config.fontStyle || 'normal',
    textShadow: config.hasTextShadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
    border: config.hasBorder ? `2px solid ${config.borderColor}` : 'none',
    padding: config.hasBorder ? '8px 16px' : '0',
    borderRadius: config.hasBorder ? '8px' : '0',
    animationDuration: `${Math.max(1, 21 - config.speed * 2)}s`,
    animationPlayState: config.isPlaying ? 'running' : 'paused',
    lineHeight: '1.2',
    whiteSpace: config.direction === 'up' || config.direction === 'down' ? 'pre-line' : 'nowrap',
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: config.backgroundColor,
    width: '100%',
    height: '100%',
    minWidth: isFullscreen ? '100vw' : '100%',
    minHeight: isFullscreen ? '100vh' : '100%',
    position: isFullscreen ? 'absolute' : 'relative',
    overflow: 'hidden',
  };

  useEffect(() => {
    if (contentRef.current) {
      const duration = `${Math.max(1, 21 - config.speed * 2)}s`;
      contentRef.current.style.animationDuration = duration;
      contentRef.current.style.animationPlayState = config.isPlaying ? 'running' : 'paused';
      contentRef.current.style.fontSize = `${config.fontSize}px`;
      contentRef.current.style.color = config.textColor;
      contentRef.current.style.fontFamily = config.fontFamily;
      contentRef.current.style.fontWeight = config.fontWeight || 'normal';
      contentRef.current.style.fontStyle = config.fontStyle || 'normal';
      contentRef.current.style.textShadow = config.hasTextShadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none';
      contentRef.current.style.border = config.hasBorder ? `2px solid ${config.borderColor}` : 'none';
    }
  }, [config]);

  return (
    <div
      ref={containerRef}
      className={cn(
        getContainerClass(),
        'h-full w-full min-h-full min-w-full',
        className
      )}
      style={{
        ...containerStyles,
        ...(isFullscreen && {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }),
        display: 'flex',
        alignItems: 'center',
        justifyContent: config.direction === 'up' || config.direction === 'down' ? 'center' : 'flex-start',
      }}
    >
      <div
        ref={contentRef}
        className={cn(
          'marquee-content',
          getAnimationClass(),
          config.direction === 'up' || config.direction === 'down' 
            ? 'whitespace-pre-line text-center' 
            : 'whitespace-nowrap'
        )}
        style={{
          ...textStyles,
          minWidth: config.direction === 'left' || config.direction === 'right' ? '100%' : 'auto',
          minHeight: config.direction === 'up' || config.direction === 'down' ? '100%' : 'auto',
        }}
      >
        {config.text || '請輸入跑馬燈文字...'}
      </div>
    </div>
  );
};