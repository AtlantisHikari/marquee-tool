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
                  'flex-1 px-4 py-4 text-xl font-medium transition-colors',
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
                  'flex-1 px-4 py-4 text-xl font-medium transition-colors',
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
                        "rounded-lg border transition-all hover:scale-105 relative",
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 w-[95vw] max-w-lg min-h-[70vh] max-h-[85vh] overflow-hidden flex flex-col">
            
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
            <div className="p-6 flex-1 overflow-y-auto bg-white" style={{ minHeight: '400px' }}>
              {advancedTab === 'grid' && (
                // 格線顏色選擇器 - 重新設計
                <div className="space-y-4">
                  {/* 主要色彩格線 - 使用固定顏色陣列 */}
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      // 第一排 - 基本色
                      '#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000',
                      // 第二排 - 主要色
                      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
                      // 第三排 - 紅色系
                      '#FFB3B3', '#FF8080', '#FF4D4D', '#FF1A1A', '#E60000', '#B30000',
                      // 第四排 - 橙色系
                      '#FFD1A3', '#FFBB7A', '#FFA652', '#FF9029', '#E6751A', '#CC5A0A',
                      // 第五排 - 黃色系
                      '#FFFF99', '#FFFF66', '#FFFF33', '#E6E600', '#CCCC00', '#999900',
                      // 第六排 - 綠色系
                      '#B3FFB3', '#80FF80', '#4DFF4D', '#1AFF1A', '#00E600', '#00B300',
                      // 第七排 - 藍色系
                      '#B3D9FF', '#80C0FF', '#4DA6FF', '#1A8CFF', '#0073E6', '#005AB3',
                      // 第八排 - 紫色系
                      '#E0B3FF', '#D180FF', '#C14DFF', '#B21AFF', '#9900E6', '#7700B3'
                    ].map((color, i) => (
                      <button
                        key={i}
                        onClick={() => handleAdvancedColorSelect(color)}
                        className="w-12 h-12 border border-gray-300 hover:border-gray-500 hover:scale-105 transition-all rounded-lg shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  {/* 不透明度滑桿 */}
                  <div className="space-y-3 mt-6">
                    <span className="text-base font-medium text-gray-700">不透明度</span>
                    <div className="relative h-8 bg-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-transparent to-current rounded-lg" 
                        style={{ color: value }}
                      ></div>
                      <div className="absolute right-1 top-1 w-6 h-6 bg-white border-2 border-gray-400 rounded-full shadow cursor-pointer"></div>
                    </div>
                    <div className="text-right text-base text-gray-600">100%</div>
                  </div>
                </div>
              )}

              {advancedTab === 'spectrum' && (
                // 光譜顏色選擇器 - 重新設計
                <div className="space-y-6">
                  {/* 主色彩區域 - 大型可點擊區域 */}
                  <div 
                    className="w-full h-64 relative rounded-xl overflow-hidden border-2 border-gray-300 cursor-crosshair shadow-lg"
                    style={{
                      background: `
                        linear-gradient(to bottom, 
                          rgba(255,255,255,1) 0%, 
                          rgba(255,255,255,0.7) 25%, 
                          rgba(255,255,255,0) 50%, 
                          rgba(0,0,0,0) 50%, 
                          rgba(0,0,0,0.7) 75%, 
                          rgba(0,0,0,1) 100%
                        ), 
                        linear-gradient(to right, 
                          #FF0000 0%, 
                          #FF8000 14%, 
                          #FFFF00 28%, 
                          #80FF00 42%, 
                          #00FF00 56%, 
                          #00FF80 70%, 
                          #00FFFF 84%, 
                          #0080FF 100%
                        )
                      `
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const hue = Math.round((x / rect.width) * 360);
                      const saturation = Math.round(100 - (y / rect.height) * 30);
                      const lightness = Math.round(100 - (y / rect.height) * 60);
                      const color = `hsl(${hue}, ${Math.max(saturation, 20)}%, ${Math.max(lightness, 10)}%)`;
                      handleAdvancedColorSelect(color);
                    }}
                  >
                    {/* 選擇指示器 - 更大更明顯 */}
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 border-3 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-xl">
                      <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
                    </div>
                  </div>

                  {/* 色相滑桿 */}
                  <div className="space-y-3">
                    <span className="text-lg font-medium text-gray-700">色相</span>
                    <div 
                      className="relative h-12 rounded-xl overflow-hidden border border-gray-300 cursor-pointer shadow-sm"
                      style={{
                        background: `linear-gradient(to right, 
                          #FF0000 0%, #FF8000 14%, #FFFF00 28%, #80FF00 42%, 
                          #00FF00 56%, #00FF80 70%, #00FFFF 84%, #0080FF 100%
                        )`
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const hue = Math.round((x / rect.width) * 360);
                        const color = `hsl(${hue}, 80%, 60%)`;
                        handleAdvancedColorSelect(color);
                      }}
                    >
                      <div className="absolute top-1 left-1/2 w-10 h-10 bg-white border-2 border-gray-400 rounded-full shadow-lg cursor-pointer transform -translate-x-1/2"></div>
                    </div>
                  </div>

                  {/* 不透明度滑桿 */}
                  <div className="space-y-3">
                    <span className="text-lg font-medium text-gray-700">不透明度</span>
                    <div className="relative h-12 bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                      <div 
                        className="h-full bg-gradient-to-r from-transparent to-current rounded-xl" 
                        style={{ color: value }}
                      ></div>
                      <div className="absolute right-1 top-1 w-10 h-10 bg-white border-2 border-gray-400 rounded-full shadow-lg cursor-pointer"></div>
                    </div>
                    <div className="text-right text-lg text-gray-600 font-medium">100%</div>
                  </div>
                </div>
              )}

              {advancedTab === 'sliders' && (
                // 滑桿顏色選擇器 - 重新設計
                <div className="space-y-8">
                  {/* 當前顏色預覽 */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-16 rounded-xl border-2 border-gray-300 shadow-lg"
                      style={{ backgroundColor: value }}
                    ></div>
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-gray-800">{value.toUpperCase()}</div>
                      <div className="text-sm text-gray-600">當前選擇的顏色</div>
                    </div>
                  </div>

                  {/* 紅色滑桿 */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">紅色 (R)</span>
                      <span className="text-lg text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded">255</span>
                    </div>
                    <div className="relative h-12 bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                      <div 
                        className="w-full h-full rounded-xl"
                        style={{
                          background: `linear-gradient(to right, 
                            rgba(0,0,0,1) 0%, 
                            rgba(255,0,0,0.5) 50%, 
                            rgba(255,0,0,1) 100%)`
                        }}
                      ></div>
                      <div className="absolute right-1 top-1 w-10 h-10 bg-white border-2 border-gray-400 rounded-full shadow-lg cursor-pointer"></div>
                    </div>
                  </div>

                  {/* 綠色滑桿 */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">綠色 (G)</span>
                      <span className="text-lg text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded">77</span>
                    </div>
                    <div className="relative h-12 bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                      <div 
                        className="w-full h-full rounded-xl"
                        style={{
                          background: `linear-gradient(to right, 
                            rgba(0,0,0,1) 0%, 
                            rgba(0,255,0,0.5) 50%, 
                            rgba(0,255,0,1) 100%)`
                        }}
                      ></div>
                      <div className="absolute left-8 top-1 w-10 h-10 bg-white border-2 border-gray-400 rounded-full shadow-lg cursor-pointer"></div>
                    </div>
                  </div>

                  {/* 藍色滑桿 */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">藍色 (B)</span>
                      <span className="text-lg text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded">61</span>
                    </div>
                    <div className="relative h-12 bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                      <div 
                        className="w-full h-full rounded-xl"
                        style={{
                          background: `linear-gradient(to right, 
                            rgba(0,0,0,1) 0%, 
                            rgba(0,0,255,0.5) 50%, 
                            rgba(0,0,255,1) 100%)`
                        }}
                      ></div>
                      <div className="absolute left-16 top-1 w-10 h-10 bg-white border-2 border-gray-400 rounded-full shadow-lg cursor-pointer"></div>
                    </div>
                  </div>

                  {/* 色碼輸入 */}
                  <div className="space-y-4 pt-6 border-t-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-blue-600 font-semibold">十六進位色碼</span>
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-700 mr-1">#</span>
                        <input
                          type="text"
                          value={value.replace('#', '').toUpperCase()}
                          onChange={(e) => {
                            const hex = e.target.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6);
                            if (hex.length === 6) {
                              handleAdvancedColorSelect(`#${hex}`);
                            }
                          }}
                          className="text-xl font-mono bg-white px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none w-32 shadow-sm"
                          placeholder="000000"
                          maxLength={6}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 不透明度滑桿 */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">不透明度</span>
                      <span className="text-lg text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded">100%</span>
                    </div>
                    <div className="relative h-12 bg-gray-200 rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                      <div 
                        className="h-full bg-gradient-to-r from-transparent to-current rounded-xl" 
                        style={{ color: value }}
                      ></div>
                      <div className="absolute right-1 top-1 w-10 h-10 bg-white border-2 border-gray-400 rounded-full shadow-lg cursor-pointer"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 底部顏色預覽和快速顏色選擇 */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                {/* 當前顏色預覽 */}
                <div 
                  className="w-16 h-10 rounded-lg border border-gray-300 shadow-sm"
                  style={{ backgroundColor: value }}
                ></div>
                
                {/* 快速顏色選擇 */}
                <div className="flex gap-2 flex-1">
                  {['#FF0000', '#000000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF'].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleAdvancedColorSelect(color)}
                      className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-gray-500 hover:scale-110 transition-all shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};