import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { COMMON_COLORS } from '../../types/marquee';
import { Palette, Check, X } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'common' | 'custom'>('common');
  const [isOpen, setIsOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [advancedTab, setAdvancedTab] = useState<'grid' | 'spectrum' | 'sliders'>('grid');

  const handleColorSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  const handleAdvancedColorSelect = (color: string) => {
    onChange(color);
    setIsAdvancedOpen(false);
    setIsOpen(false);
  };

  const openAdvancedPicker = () => {
    setIsAdvancedOpen(true);
  };

  return (
    <div className={cn('space-y-2 relative', className)}>
      {label && (
        <label className="text-base sm:text-lg font-medium text-gray-700 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          {label}
        </label>
      )}
      
      {/* 觸發按鈕 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors flex items-center gap-4 px-5"
        style={{ 
          backgroundColor: value, 
          height: '60px' // 3倍高度 (原本20px)
        }}
      >
        <span 
          className="text-xl font-mono flex-1 text-left font-bold"
          style={{ 
            color: value === '#FFFFFF' || value === '#ffffff' ? '#000000' : '#FFFFFF'
          }}
        >
          {value.toUpperCase()}
        </span>
        <div 
          className="text-xl"
          style={{ 
            color: value === '#FFFFFF' || value === '#ffffff' ? '#000000' : '#FFFFFF'
          }}
        >
          {isOpen ? '▲' : '▼'}
        </div>
      </button>

      {/* 顏色選擇器面板 */}
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 z-40 bg-black/20" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 選擇器面板 */}
          <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[500px] overflow-y-auto">
            
            {/* 分頁標籤 */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => setActiveTab('common')}
                className={cn(
                  'flex-1 px-4 py-4 text-lg font-medium transition-colors',
                  activeTab === 'common'
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                常用顏色
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={cn(
                  'flex-1 px-4 py-4 text-lg font-medium transition-colors',
                  activeTab === 'custom'
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                自訂顏色
              </button>
            </div>

            {/* 內容區域 */}
            <div className="p-6">
              {activeTab === 'common' && (
                // 常用顏色網格 - 4x4矩形色塊
                <div className="grid grid-cols-4 gap-3">
                  {COMMON_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={cn(
                        "rounded-lg border-2 transition-all hover:scale-105 relative",
                        value.toLowerCase() === color.toLowerCase()
                          ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                      style={{ 
                        backgroundColor: color, 
                        width: '80px', 
                        height: '40px' // 2:1 矩形比例
                      }}
                      title={color}
                    >
                      {value.toLowerCase() === color.toLowerCase() && (
                        <Check className="w-6 h-6 text-white absolute inset-0 m-auto drop-shadow-lg" />
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {activeTab === 'custom' && (
                // 自訂顏色選擇器 - 簡化版
                <div className="space-y-4">
                  {/* 主要顏色選擇器按鈕 */}
                  <button
                    type="button"
                    onClick={openAdvancedPicker}
                    className="w-full rounded-lg border border-gray-300 cursor-pointer flex items-center justify-center relative hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: value, height: '120px' }}
                  >
                    <span 
                      className="text-xl font-bold drop-shadow-lg" 
                      style={{ 
                        color: value === '#FFFFFF' || value === '#ffffff' ? '#000000' : '#FFFFFF'
                      }}
                    >
                      點擊選擇顏色
                    </span>
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    點擊上方按鈕開啟專業顏色選擇器
                  </p>
                </div>
              )}
            </div>

            {/* 關閉按鈕 */}
            <div className="p-5 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-6 py-4 text-xl text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-100 font-medium"
              >
                確定
              </button>
            </div>
          </div>
        </>
      )}

      {/* 進階顏色選擇器浮動視窗 */}
      {isAdvancedOpen && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 z-50 bg-black/50" 
            onClick={() => setIsAdvancedOpen(false)}
          />
          
          {/* 進階選擇器視窗 */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 w-[90vw] max-w-md max-h-[80vh] overflow-hidden">
            
            {/* 標題欄 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">顏色</h3>
              <button
                onClick={() => setIsAdvancedOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 分頁標籤 */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => setAdvancedTab('grid')}
                className={cn(
                  'flex-1 px-4 py-3 text-base font-medium transition-colors',
                  advancedTab === 'grid'
                    ? 'bg-white text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                格線
              </button>
              <button
                onClick={() => setAdvancedTab('spectrum')}
                className={cn(
                  'flex-1 px-4 py-3 text-base font-medium transition-colors',
                  advancedTab === 'spectrum'
                    ? 'bg-white text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                光譜
              </button>
              <button
                onClick={() => setAdvancedTab('sliders')}
                className={cn(
                  'flex-1 px-4 py-3 text-base font-medium transition-colors',
                  advancedTab === 'sliders'
                    ? 'bg-white text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                滑桿
              </button>
            </div>

            {/* 內容區域 */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {advancedTab === 'grid' && (
                // 格線顏色選擇器
                <div className="space-y-4">
                  {/* 色彩格線 */}
                  <div className="grid grid-cols-12 gap-1">
                    {Array.from({ length: 144 }, (_, i) => {
                      const hue = (i % 12) * 30;
                      const lightness = 90 - Math.floor(i / 12) * 7.5;
                      const color = `hsl(${hue}, 80%, ${lightness}%)`;
                      return (
                        <button
                          key={i}
                          onClick={() => handleAdvancedColorSelect(color)}
                          className="w-6 h-6 border border-gray-200 hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      );
                    })}
                  </div>
                  
                  {/* 灰階 */}
                  <div className="grid grid-cols-12 gap-1 mt-2">
                    {Array.from({ length: 12 }, (_, i) => {
                      const gray = Math.round((i / 11) * 255);
                      const color = `rgb(${gray}, ${gray}, ${gray})`;
                      return (
                        <button
                          key={i}
                          onClick={() => handleAdvancedColorSelect(`#${gray.toString(16).padStart(2, '0').repeat(3)}`)}
                          className="w-6 h-6 border border-gray-200 hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      );
                    })}
                  </div>

                  {/* 不透明度滑桿 */}
                  <div className="space-y-2 mt-4">
                    <span className="text-sm font-medium text-gray-600">不透明度</span>
                    <div className="relative">
                      <div className="w-full h-6 bg-gradient-to-r from-transparent to-current rounded" 
                           style={{ color: value }}></div>
                      <div className="absolute right-0 top-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                    </div>
                    <div className="text-right text-sm text-gray-600">100%</div>
                  </div>
                </div>
              )}

              {advancedTab === 'spectrum' && (
                // 光譜顏色選擇器
                <div className="space-y-4">
                  {/* 主色彩區域 */}
                  <div 
                    className="w-full h-48 relative rounded-lg overflow-hidden border border-gray-200 cursor-crosshair"
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), 
                                   linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,0,0,1) 17%, rgba(255,255,0,1) 33%, rgba(0,255,0,1) 50%, rgba(0,255,255,1) 67%, rgba(0,0,255,1) 83%, rgba(255,0,255,1) 100%)`
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const hue = (x / rect.width) * 360;
                      const saturation = 100;
                      const lightness = 100 - (y / rect.height) * 100;
                      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                      handleAdvancedColorSelect(color);
                    }}
                  >
                    {/* 選擇指示器 */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                  </div>

                  {/* 不透明度滑桿 */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-600">不透明度</span>
                    <div className="relative">
                      <div className="w-full h-6 bg-gradient-to-r from-transparent to-current rounded" 
                           style={{ color: value }}></div>
                      <div className="absolute right-0 top-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                    </div>
                    <div className="text-right text-sm text-gray-600">100%</div>
                  </div>
                </div>
              )}

              {advancedTab === 'sliders' && (
                // 滑桿顏色選擇器
                <div className="space-y-6">
                  {/* 紅色滑桿 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">紅色</span>
                      <span className="text-sm text-gray-500">255</span>
                    </div>
                    <div className="relative">
                      <div className="w-full h-6 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded"></div>
                      <div className="absolute right-0 top-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                    </div>
                  </div>

                  {/* 綠色滑桿 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">綠色</span>
                      <span className="text-sm text-gray-500">77</span>
                    </div>
                    <div className="relative">
                      <div className="w-full h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded"></div>
                      <div className="absolute left-8 top-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                    </div>
                  </div>

                  {/* 藍色滑桿 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">藍色</span>
                      <span className="text-sm text-gray-500">61</span>
                    </div>
                    <div className="relative">
                      <div className="w-full h-6 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded"></div>
                      <div className="absolute left-16 top-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                    </div>
                  </div>

                  {/* 色碼顯示和輸入 */}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-600">Display P3 十六進位顏色 #</span>
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">EB4D3D</span>
                    </div>
                  </div>

                  {/* 不透明度滑桿 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">不透明度</span>
                      <span className="text-sm text-gray-500">100%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full h-6 bg-gradient-to-r from-transparent to-current rounded" 
                           style={{ color: value }}></div>
                      <div className="absolute right-0 top-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 底部顏色預覽和快速顏色選擇 */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                {/* 當前顏色預覽 */}
                <div 
                  className="w-12 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: value }}
                ></div>
                
                {/* 快速顏色選擇 */}
                <div className="flex gap-1">
                  {['#FF0000', '#000000', '#0000FF', '#00FF00', '#FFFF00'].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleAdvancedColorSelect(color)}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <button className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <span className="text-gray-600 text-lg">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};