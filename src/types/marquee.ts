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

// 常用顏色預設 - 按指定順序排列
export const COMMON_COLORS = [
  '#FFFFFF', // White
  '#808080', // Grey
  '#000000', // Black
  '#FFB6C1', // Pink
  '#FF0000', // Red
  '#FF4500', // Red Orange
  '#FF8C00', // Orange
  '#FFD700', // Yellow Orange
  '#FFFF00', // Yellow
  '#9ACD32', // Yellow Green
  '#00FF00', // Green
  '#008B8B', // Blue Green
  '#87CEEB', // 淺藍色 (Sky Blue)
  '#00BFFF', // 天藍色 (Deep Sky Blue)
  '#0000CD', // 深藍色 (Medium Blue)
  '#8A2BE2', // 紫色 (Blue Violet)
];