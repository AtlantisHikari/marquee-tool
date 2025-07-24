import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarqueeManager } from '../../hooks/useMarqueeManager';
import { MarqueeDisplay } from '../../components/MarqueeDisplay';
import { ColorPicker } from '../../components/ui/ColorPicker';
import { cn } from '../../utils/cn';
import type { DirectionType } from '../../types/marquee';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Type,
  Gauge,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
  ArrowUp,
  ArrowDown,
  Eye,
  Settings,
  Palette,
  Home,
  Monitor
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getMarqueeById, 
    updateMarquee,
    setCurrentItemId,
    updateCurrentConfig
  } = useMarqueeManager();

  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [marqueeName, setMarqueeName] = useState('');

  React.useEffect(() => {
    if (id) {
      setCurrentItemId(id);
      const item = getMarqueeById(id);
      if (item) {
        setMarqueeName(item.name);
      }
    }
  }, [id, setCurrentItemId, getMarqueeById]);

  const marqueeItem = id ? getMarqueeById(id) : null;

  if (!marqueeItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">跑馬燈不存在</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            返回主頁
          </button>
        </div>
      </div>
    );
  }

  const handleConfigChange = (updates: Partial<typeof marqueeItem.config>) => {
    updateCurrentConfig(updates);
  };

  const handleNameChange = () => {
    if (marqueeName.trim() !== marqueeItem.name) {
      updateMarquee(marqueeItem.id, { name: marqueeName.trim() });
    }
  };

  const handleDirectionChange = (direction: DirectionType) => {
    handleConfigChange({ direction });
  };

  const togglePlayPause = () => {
    handleConfigChange({ isPlaying: !marqueeItem.config.isPlaying });
  };

  const handlePlayMarquee = () => {
    navigate(`/play/${id}`);
  };

  const directionOptions = [
    { value: 'left' as DirectionType, label: '向左', icon: ArrowLeftIcon },
    { value: 'right' as DirectionType, label: '向右', icon: ArrowRight },
    { value: 'up' as DirectionType, label: '向上', icon: ArrowUp },
    { value: 'down' as DirectionType, label: '向下', icon: ArrowDown },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" style={{ padding: '16px 24px' }}>
      {/* 頂部導航 */}
      <div className="bg-white shadow-sm border-b rounded-xl">
        <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-bold text-gray-900 whitespace-nowrap" style={{ fontSize: '32px' }}>
                  跑馬燈設定
                </h1>
                <p className="text-base text-gray-600 mt-2">
                  自訂你的跑馬燈顯示效果
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* 快速跳轉按鈕 */}
              <div className="hidden sm:flex items-center gap-3 mr-4">
                <button
                  onClick={() => navigate('/')}
                  className="p-3 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  title="主頁"
                >
                  <Home className="w-6 h-6" />
                </button>
                <button
                  className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  title="設定"
                >
                  <Settings className="w-6 h-6" />
                </button>
                <button
                  onClick={handlePlayMarquee}
                  className="p-3 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  title="全螢幕"
                >
                  <Monitor className="w-6 h-6" />
                </button>
              </div>
              <button
                onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                className={cn(
                  "p-3 rounded-lg transition-colors text-base flex items-center gap-3",
                  isPreviewVisible 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <Eye className="w-5 h-5" />
                <span className="hidden sm:inline">預覽</span>
              </button>
              <button
                onClick={handlePlayMarquee}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-3 text-base"
              >
                <Monitor className="w-5 h-5" />
                全螢幕播放
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 py-8">
        {/* 預覽區域 */}
        {isPreviewVisible && (
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
                <h3 className="font-medium text-base sm:text-lg">📺 即時預覽</h3>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <button
                    onClick={togglePlayPause}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    {marqueeItem.config.isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                  <span className="text-gray-300">
                    {marqueeItem.config.isPlaying ? '播放中' : '已暫停'}
                  </span>
                </div>
              </div>
              <div className="h-40 sm:h-56 md:h-72">
                <MarqueeDisplay 
                  config={marqueeItem.config}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* 設定面板 */}
        <div className="grid grid-cols-1 gap-8 max-w-full">
          {/* 基本設定 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 overflow-hidden">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontSize: '28px' }}>
              <Type className="w-6 h-6 text-blue-600" />
              基本設定
            </h2>
            
            <div className="space-y-6 max-w-full">
              {/* 跑馬燈名稱 */}
              <div className="max-w-full">
                <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '24px' }}>
                  跑馬燈名稱
                </label>
                <input
                  type="text"
                  value={marqueeName}
                  onChange={(e) => setMarqueeName(e.target.value)}
                  onBlur={handleNameChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border"
                  style={{ fontSize: '24px', maxWidth: '100%' }}
                  placeholder="輸入跑馬燈名稱..."
                />
              </div>

              {/* 文字內容 */}
              <div className="max-w-full">
                <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '24px' }}>
                  文字內容
                </label>
                <textarea
                  value={marqueeItem.config.text}
                  onChange={(e) => handleConfigChange({ text: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border overflow-y-auto"
                  style={{ fontSize: '24px', maxWidth: '100%', minHeight: '120px', maxHeight: '300px' }}
                  placeholder="輸入要顯示的文字..."
                />
              </div>

              {/* 字體大小 */}
              <div className="max-w-full">
                <label className="block font-medium text-gray-700 mb-3" style={{ fontSize: '24px' }}>
                  字體大小: {marqueeItem.config.fontSize}px
                </label>
                <div className="px-4 w-full max-w-full">
                  <input
                    type="range"
                    min="12"
                    max="500"
                    value={marqueeItem.config.fontSize}
                    onChange={(e) => handleConfigChange({ fontSize: parseInt(e.target.value) })}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2 px-4">
                  <span>12px</span>
                  <span>500px</span>
                </div>
                <div className="mt-2 px-4">
                  <input
                    type="number"
                    min="12"
                    max="500"
                    value={marqueeItem.config.fontSize}
                    onChange={(e) => handleConfigChange({ fontSize: parseInt(e.target.value) || 12 })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 box-border"
                    style={{ fontSize: '24px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 分隔線 */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* 顏色設定 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontSize: '28px' }}>
              <Palette className="w-6 h-6 text-purple-600" />
              顏色設定
            </h2>
            
            <div className="space-y-6">
              <ColorPicker
                label="文字顏色"
                value={marqueeItem.config.textColor}
                onChange={(color) => handleConfigChange({ textColor: color })}
              />
              
              <ColorPicker
                label="背景顏色"
                value={marqueeItem.config.backgroundColor}
                onChange={(color) => handleConfigChange({ backgroundColor: color })}
              />
            </div>
          </div>

          {/* 分隔線 */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* 動畫設定 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontSize: '28px' }}>
              <Gauge className="w-6 h-6 text-green-600" />
              動畫設定
            </h2>
            
            <div className="space-y-6">
              {/* 滾動速度 */}
              <div className="w-full overflow-hidden">
                <label className="block font-medium text-gray-700 mb-3" style={{ fontSize: '24px' }}>
                  滾動速度: {marqueeItem.config.speed}
                </label>
                <div className="px-6 w-full">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={marqueeItem.config.speed}
                    onChange={(e) => handleConfigChange({ speed: parseInt(e.target.value) })}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2 px-6">
                  <span>慢</span>
                  <span>快</span>
                </div>
                <div className="mt-2 px-6">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={marqueeItem.config.speed}
                    onChange={(e) => handleConfigChange({ speed: parseInt(e.target.value) || 1 })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 box-border"
                    style={{ fontSize: '24px' }}
                  />
                </div>
              </div>

              {/* 滾動方向 */}
              <div>
                <label className="block font-medium text-gray-700 mb-4" style={{ fontSize: '24px' }}>
                  滾動方向
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {directionOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleDirectionChange(option.value)}
                        className={cn(
                          'relative px-3 py-3 rounded-xl shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-1 font-medium text-base',
                          'active:scale-95 active:shadow-sm transform',
                          marqueeItem.config.direction === option.value
                            ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-blue-200 ring-2 ring-blue-300'
                            : 'bg-gradient-to-b from-white to-gray-50 text-gray-700 border border-gray-200 hover:from-gray-50 hover:to-gray-100 hover:shadow-lg hover:border-gray-300'
                        )}
                        style={{
                          boxShadow: marqueeItem.config.direction === option.value 
                            ? '0 4px 12px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(59, 130, 246, 0.1)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs font-semibold">{option.label}</span>
                        
                        {/* 按鈕光澤效果 */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 分隔線 */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* 字體設定 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontSize: '28px' }}>
              <Settings className="w-6 h-6 text-gray-600" />
              字體設定
            </h2>
            
            <div className="space-y-6">
              {/* 字形變化 */}
              <div>
                <label className="block font-medium text-gray-700 mb-4" style={{ fontSize: '24px' }}>
                  字形變化
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleConfigChange({ fontWeight: 'normal', fontStyle: 'normal' })}
                    className={cn(
                      'relative px-3 py-4 rounded-xl shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-2 font-medium text-base',
                      'active:scale-95 active:shadow-sm transform',
                      marqueeItem.config.fontWeight === 'normal' && marqueeItem.config.fontStyle === 'normal'
                        ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-blue-200 ring-2 ring-blue-300'
                        : 'bg-gradient-to-b from-white to-gray-50 text-gray-700 border border-gray-200 hover:from-gray-50 hover:to-gray-100 hover:shadow-lg hover:border-gray-300'
                    )}
                    style={{
                      boxShadow: marqueeItem.config.fontWeight === 'normal' && marqueeItem.config.fontStyle === 'normal'
                        ? '0 4px 12px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(59, 130, 246, 0.1)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <span className="text-xs font-semibold">預設</span>
                    {/* 按鈕光澤效果 */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
                  </button>
                  <button
                    onClick={() => handleConfigChange({ fontWeight: 'bold' })}
                    className={cn(
                      'relative px-3 py-4 rounded-xl shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-2 font-bold text-base',
                      'active:scale-95 active:shadow-sm transform',
                      marqueeItem.config.fontWeight === 'bold'
                        ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-blue-200 ring-2 ring-blue-300'
                        : 'bg-gradient-to-b from-white to-gray-50 text-gray-700 border border-gray-200 hover:from-gray-50 hover:to-gray-100 hover:shadow-lg hover:border-gray-300'
                    )}
                    style={{
                      boxShadow: marqueeItem.config.fontWeight === 'bold'
                        ? '0 4px 12px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(59, 130, 246, 0.1)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <span className="text-xs font-semibold">粗體</span>
                    {/* 按鈕光澤效果 */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
                  </button>
                  <button
                    onClick={() => handleConfigChange({ fontStyle: 'italic' })}
                    className={cn(
                      'relative px-3 py-4 rounded-xl shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-2 font-medium text-base italic',
                      'active:scale-95 active:shadow-sm transform',
                      marqueeItem.config.fontStyle === 'italic'
                        ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-blue-200 ring-2 ring-blue-300'
                        : 'bg-gradient-to-b from-white to-gray-50 text-gray-700 border border-gray-200 hover:from-gray-50 hover:to-gray-100 hover:shadow-lg hover:border-gray-300'
                    )}
                    style={{
                      boxShadow: marqueeItem.config.fontStyle === 'italic'
                        ? '0 4px 12px rgba(59, 130, 246, 0.3), 0 2px 4px rgba(59, 130, 246, 0.1)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <span className="text-xs font-semibold">斜體</span>
                    {/* 按鈕光澤效果 */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
                  </button>
                </div>
              </div>

              {/* 字體系列 */}
              <div>
                <label className="block font-medium text-gray-700 mb-2" style={{ fontSize: '24px' }}>
                  字體系列
                </label>
                <select
                  value={marqueeItem.config.fontFamily}
                  onChange={(e) => handleConfigChange({ fontFamily: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ fontSize: '24px' }}
                >
                  <option value="system-ui, sans-serif">系統預設</option>
                  <option value="'Noto Sans TC', sans-serif">Noto Sans TC</option>
                  <option value="'Helvetica Neue', Arial, sans-serif">Helvetica</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="'Optima', sans-serif">Optima</option>
                  <option value="'Futura', sans-serif">Futura</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 自訂樣式 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .slider::-webkit-slider-thumb:hover {
            background: #2563eb;
            transform: scale(1.1);
          }
          .dot {
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `
      }} />
    </div>
  );
};