export interface MarqueeConfig {
  text: string;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  speed: number;
  direction: 'left' | 'right' | 'up' | 'down';
  isPlaying: boolean;
  fontFamily: string;
  hasTextShadow: boolean;
  hasBorder: boolean;
  borderColor: string;
  isFullscreen: boolean;
}

export interface PresetTemplate {
  id: string;
  name: string;
  config: Partial<MarqueeConfig>;
}

export type DirectionType = MarqueeConfig['direction'];