import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { COMMON_COLORS } from '../../types/marquee';
import { Palette, Check } from 'lucide-react';

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

  const handleColorSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
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
                // 自訂顏色選擇器 - Photoshop風格
                <div className="space-y-6">
                  {/* 主要顏色選擇器按鈕 */}
                  <div 
                    className="w-full rounded-lg border border-gray-300 cursor-pointer flex items-center justify-center relative"
                    style={{ backgroundColor: value, height: '120px' }}
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'color';
                      input.value = value;
                      input.addEventListener('change', (e) => {
                        const target = e.target as HTMLInputElement;
                        handleColorSelect(target.value);
                      });
                      input.style.position = 'absolute';
                      input.style.top = '-1000px';
                      document.body.appendChild(input);
                      input.click();
                      document.body.removeChild(input);
                    }}
                  >
                    <span 
                      className="text-xl font-bold drop-shadow-lg" 
                      style={{ 
                        color: value === '#FFFFFF' || value === '#ffffff' ? '#000000' : '#FFFFFF'
                      }}
                    >
                      點擊選擇顏色
                    </span>
                  </div>

                  {/* 色系調色盤 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-700">色系調色盤</h4>
                    
                    {/* 紅色系 */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-600">紅色系</span>
                      <div className="grid grid-cols-8 gap-2">
                        {['#FF0000', '#FF3333', '#FF6666', '#FF9999', '#FFCCCC', '#CC0000', '#990000', '#660000'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={cn(
                              "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                              value.toLowerCase() === color.toLowerCase()
                                ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-gray-400"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 橙色系 */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-600">橙色系</span>
                      <div className="grid grid-cols-8 gap-2">
                        {['#FF8000', '#FF9933', '#FFB366', '#FFCC99', '#FFE6CC', '#CC6600', '#994D00', '#663300'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={cn(
                              "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                              value.toLowerCase() === color.toLowerCase()
                                ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-gray-400"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 黃色系 */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-600">黃色系</span>
                      <div className="grid grid-cols-8 gap-2">
                        {['#FFFF00', '#FFFF33', '#FFFF66', '#FFFF99', '#FFFFCC', '#CCCC00', '#999900', '#666600'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={cn(
                              "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                              value.toLowerCase() === color.toLowerCase()
                                ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-gray-400"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 綠色系 */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-600">綠色系</span>
                      <div className="grid grid-cols-8 gap-2">
                        {['#00FF00', '#33FF33', '#66FF66', '#99FF99', '#CCFFCC', '#00CC00', '#009900', '#006600'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={cn(
                              "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                              value.toLowerCase() === color.toLowerCase()
                                ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-gray-400"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 藍色系 */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-600">藍色系</span>
                      <div className="grid grid-cols-8 gap-2">
                        {['#0000FF', '#3333FF', '#6666FF', '#9999FF', '#CCCCFF', '#0000CC', '#000099', '#000066'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={cn(
                              "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                              value.toLowerCase() === color.toLowerCase()
                                ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-gray-400"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 紫色系 */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-600">紫色系</span>
                      <div className="grid grid-cols-8 gap-2">
                        {['#8000FF', '#9933FF', '#B366FF', '#CC99FF', '#E6CCFF', '#6600CC', '#4D0099', '#330066'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={cn(
                              "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                              value.toLowerCase() === color.toLowerCase()
                                ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-gray-400"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 灰階 */}
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-600">灰階</span>
                      <div className="grid grid-cols-8 gap-2">
                        {['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#E0E0E0', '#F0F0F0', '#FFFFFF'].map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            className={cn(
                              "w-8 h-8 rounded border-2 transition-all hover:scale-110",
                              value.toLowerCase() === color.toLowerCase()
                                ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-gray-400"
                            )}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* HEX 色碼輸入 */}
                  <div className="space-y-3">
                    <label className="text-lg font-medium text-gray-600">
                      色碼輸入
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        const color = e.target.value;
                        if (color.startsWith('#') && (color.length === 4 || color.length === 7)) {
                          onChange(color);
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="#000000"
                    />
                  </div>

                  <p className="text-sm text-gray-500">
                    點擊「點擊選擇顏色」開啟系統顏色選擇器，或從上方色系調色盤選擇，也可直接輸入HEX色碼
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
    </div>
  );
};