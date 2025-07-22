import React from 'react';
import type { MarqueeConfig, DirectionType } from '../../types/marquee';
import { cn } from '../../utils/cn';
import { Play, Pause, Maximize, Settings, Palette } from 'lucide-react';

interface ControlPanelProps {
  config: MarqueeConfig;
  onConfigChange: (newConfig: Partial<MarqueeConfig>) => void;
  onFullscreen: () => void;
  className?: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onConfigChange,
  onFullscreen,
  className
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onConfigChange({ text: e.target.value });
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({ speed: parseInt(e.target.value) });
  };

  const handleDirectionChange = (direction: DirectionType) => {
    onConfigChange({ direction });
  };

  const togglePlayPause = () => {
    onConfigChange({ isPlaying: !config.isPlaying });
  };

  return (
    <div className={cn('bg-white rounded-lg shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6', className)}>
      {/* 標題 */}
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">跑馬燈控制台</h2>
      </div>

      {/* 文字內容 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">文字內容</label>
        <textarea
          value={config.text}
          onChange={handleTextChange}
          placeholder="請輸入跑馬燈文字..."
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          rows={3}
        />
      </div>

      {/* 控制項 - 移動端垂直佈局 */}
      <div className="space-y-4 sm:space-y-6">
        {/* 字體大小和滾動速度 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 字體大小 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">字體大小</label>
            <input
              type="number"
              value={config.fontSize}
              onChange={(e) => onConfigChange({ fontSize: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-base"
              min="12"
              max="200"
            />
          </div>

          {/* 滾動速度 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              滾動速度: {config.speed}
            </label>
            <input
              type="range"
              value={config.speed}
              onChange={handleSpeedChange}
              className="w-full h-8"
              min="1"
              max="10"
            />
          </div>
        </div>

        {/* 顏色控制 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 文字顏色 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Palette className="w-4 h-4" />
              文字顏色
            </label>
            <input
              type="color"
              value={config.textColor}
              onChange={(e) => onConfigChange({ textColor: e.target.value })}
              className="w-full h-12 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>

          {/* 背景顏色 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">背景顏色</label>
            <input
              type="color"
              value={config.backgroundColor}
              onChange={(e) => onConfigChange({ backgroundColor: e.target.value })}
              className="w-full h-12 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
        </div>

        {/* 滾動方向 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">滾動方向</label>
          <div className="grid grid-cols-2 sm:flex gap-2">
            {[
              { value: 'left' as DirectionType, label: '← 左' },
              { value: 'right' as DirectionType, label: '→ 右' },
              { value: 'up' as DirectionType, label: '↑ 上' },
              { value: 'down' as DirectionType, label: '↓ 下' },
            ].map((direction) => (
              <button
                key={direction.value}
                onClick={() => handleDirectionChange(direction.value)}
                className={cn(
                  'px-3 py-2 text-sm rounded-md border transition-colors flex-1 sm:flex-none',
                  config.direction === direction.value
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 active:bg-gray-100'
                )}
              >
                {direction.label}
              </button>
            ))}
          </div>
        </div>

        {/* 控制按鈕 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={togglePlayPause}
            className={cn(
              'flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-md transition-colors font-medium flex-1 sm:flex-none',
              config.isPlaying
                ? 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white'
                : 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white'
            )}
          >
            {config.isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                暫停
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                播放
              </>
            )}
          </button>

          <button
            onClick={onFullscreen}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white rounded-md transition-colors font-medium flex-1 sm:flex-none"
          >
            <Maximize className="w-4 h-4" />
            全屏顯示
          </button>
        </div>
      </div>
    </div>
  );
};