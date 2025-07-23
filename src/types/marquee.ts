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

// 常用顏色預設 - 7x8 (56色) 按漸變順序排列
export const COMMON_COLORS = [
  // 第一排 - 白色逐漸轉到灰再轉到黑
  '#FFFFFF', '#F5F5F5', '#EEEEEE', '#DDDDDD', '#BBBBBB', '#999999', '#666666', '#000000',
  
  // 第二排 - 米黃逐漸轉到鵝黃再轉深黃色
  '#FFFEF7', '#FFF8DC', '#FFFFE0', '#FFFF99', '#FFFF00', '#FFD700', '#FFA500', '#FF8C00',
  
  // 第三排 - 淺橘逐漸轉粉橘再轉到咖啡橘色
  '#FFEEE6', '#FFCC99', '#FFB366', '#FF9933', '#FF7F00', '#FF6347', '#D2691E', '#8B4513',
  
  // 第四排 - 淺粉紅逐漸轉粉紅再轉紅色再轉酒紅再轉暗紅
  '#FFE4E1', '#FFB6C1', '#FF69B4', '#FF1493', '#DC143C', '#B22222', '#8B0000', '#4B0000',
  
  // 第五排 - 淺藍逐漸轉天藍轉亮藍轉深藍轉靛藍
  '#E6F3FF', '#87CEEB', '#00BFFF', '#1E90FF', '#0066CC', '#003399', '#191970', '#000080',
  
  // 第六排 - 粉綠逐漸轉青綠再轉亮綠再轉深綠再轉墨綠
  '#E6FFE6', '#90EE90', '#00FF7F', '#00FF00', '#32CD32', '#228B22', '#006400', '#013220',
  
  // 第七排 - 粉紫轉葡萄紫轉亮紫轉深紫
  '#F0E6FF', '#DDA0DD', '#BA55D3', '#9932CC', '#8A2BE2', '#663399', '#4B0082', '#2E004B'
];