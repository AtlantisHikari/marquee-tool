import React, { useEffect, useRef } from 'react';
import type { MarqueeConfig } from '../../types/marquee';
import { cn } from '../../utils/cn';

interface MarqueeDisplayProps {
  config: MarqueeConfig;
  className?: string;
}

export const MarqueeDisplay: React.FC<MarqueeDisplayProps> = ({ 
  config, 
  className 
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

  const textStyles = {
    fontSize: `${config.fontSize}px`,
    color: config.textColor,
    fontFamily: config.fontFamily,
    textShadow: config.hasTextShadow ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
    border: config.hasBorder ? `2px solid ${config.borderColor}` : 'none',
    padding: config.hasBorder ? '8px 16px' : '0',
    borderRadius: config.hasBorder ? '8px' : '0',
    animationDuration: `${20 - config.speed * 2}s`,
    animationPlayState: config.isPlaying ? 'running' : 'paused',
  };

  const containerStyles = {
    backgroundColor: config.backgroundColor,
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.animationDuration = `${20 - config.speed * 2}s`;
      contentRef.current.style.animationPlayState = config.isPlaying ? 'running' : 'paused';
    }
  }, [config.speed, config.isPlaying]);

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
        position: 'relative',
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