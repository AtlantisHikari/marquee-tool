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

export interface MarqueeItem {
  id: string;
  name: string;
  config: MarqueeConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface PresetTemplate {
  id: string;
  name: string;
  config: Partial<MarqueeConfig>;
}

export type DirectionType = MarqueeConfig['direction'];

export interface ColorPalette {
  name: string;
  colors: string[];
}

// 常用顏色預設
export const COMMON_COLORS = [
  '#FF0000', // 紅
  '#FF8000', // 橙  
  '#FFFF00', // 黃
  '#00FF00', // 綠
  '#0080FF', // 藍
  '#4000FF', // 靛
  '#8000FF', // 紫
  '#808080', // 灰
  '#000000', // 黑
  '#FFFFFF', // 白
  '#FF69B4', // 粉
  '#FFD700', // 金
  '#8B4513', // 咖啡
  '#FF4500', // 深橙
  '#32CD32', // 萊姆綠
  '#1E90FF', // 深藍
];