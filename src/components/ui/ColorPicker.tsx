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
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* 觸發按鈕 */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-12 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors flex items-center gap-3 px-3 bg-white"
        >
          <div 
            className="w-8 h-8 rounded-md border border-gray-300 shadow-sm flex-shrink-0"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm font-mono text-gray-700 flex-1 text-left">
            {value.toUpperCase()}
          </span>
          <div className={cn(
            "w-5 h-5 border-2 border-gray-400 rounded transition-transform",
            isOpen ? "rotate-45" : "rotate-0"
          )}>
            <div className="w-1 h-1 bg-gray-400 rounded-full mx-auto mt-1.5" />
          </div>
        </button>

        {/* 顏色選擇器面板 */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
            {/* 分頁標籤 */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('common')}
                className={cn(
                  'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === 'common'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                常用顏色
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={cn(
                  'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                  activeTab === 'custom'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                自訂顏色
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'common' ? (
                // 常用顏色網格
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {COMMON_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={cn(
                        "w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 hover:shadow-md relative",
                        value.toLowerCase() === color.toLowerCase()
                          ? "border-blue-500 shadow-lg scale-105"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {value.toLowerCase() === color.toLowerCase() && (
                        <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                // 自訂顏色選擇器
                <div className="space-y-4">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorSelect(e.target.value)}
                    className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">
                      十六進位色碼
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        const color = e.target.value;
                        if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                          handleColorSelect(color);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 關閉按鈕 */}
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 點擊外部關閉 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};