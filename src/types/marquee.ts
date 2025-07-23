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

// 常用顏色預設 - 4x8 (32色) 按指定順序排列
export const COMMON_COLORS = [
  // 第一排 - 白色系到灰色系
  '#FFFFFF', '#F5F5F5', '#E0E0E0', '#CCCCCC', '#999999', '#808080', '#666666', '#000000',
  
  // 第二排 - 紅色系
  '#FFE4E6', '#FFB6C1', '#FF8A8A', '#FF0000', '#DC143C', '#B22222', '#8B0000', '#330000',
  
  // 第三排 - 橙黃色系  
  '#FFF8DC', '#FFE4B5', '#FFD700', '#FF8C00', '#FF4500', '#FF6347', '#E6A800', '#B8860B',
  
  // 第四排 - 綠色系
  '#F0FFF0', '#9ACD32', '#7CFC00', '#00FF00', '#32CD32', '#228B22', '#006400', '#013220'
];