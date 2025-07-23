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
  Settings
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 頂部導航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  <Settings className="w-6 h-6 inline mr-2" />
                  跑馬燈設定
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  自訂你的跑馬燈顯示效果
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                className={cn(
                  "p-2 rounded-lg transition-colors text-sm flex items-center gap-2",
                  isPreviewVisible 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">預覽</span>
              </button>
              <button
                onClick={handlePlayMarquee}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                全屏播放
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* 預覽區域 */}
        {isPreviewVisible && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
                <h3 className="font-medium">📺 即時預覽</h3>
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={togglePlayPause}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    {marqueeItem.config.isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  <span className="text-gray-300">
                    {marqueeItem.config.isPlaying ? '播放中' : '已暫停'}
                  </span>
                </div>
              </div>
              <div className="h-48 sm:h-64">
                <MarqueeDisplay 
                  config={marqueeItem.config}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* 設定面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側設定 */}
          <div className="space-y-6">
            {/* 基本設定 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Type className="w-5 h-5 text-blue-600" />
                基本設定
              </h2>
              
              <div className="space-y-4">
                {/* 跑馬燈名稱 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    跑馬燈名稱
                  </label>
                  <input
                    type="text"
                    value={marqueeName}
                    onChange={(e) => setMarqueeName(e.target.value)}
                    onBlur={handleNameChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="輸入跑馬燈名稱..."
                  />
                </div>

                {/* 文字內容 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    文字內容
                  </label>
                  <textarea
                    value={marqueeItem.config.text}
                    onChange={(e) => handleConfigChange({ text: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="輸入要顯示的文字..."
                  />
                </div>

                {/* 字體大小 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    字體大小: {marqueeItem.config.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="200"
                    value={marqueeItem.config.fontSize}
                    onChange={(e) => handleConfigChange({ fontSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>12px</span>
                    <span>200px</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 顏色設定 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                顏色設定
              </h2>
              
              <div className="space-y-4">
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
          </div>

          {/* 右側設定 */}
          <div className="space-y-6">
            {/* 動畫設定 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-green-600" />
                動畫設定
              </h2>
              
              <div className="space-y-4">
                {/* 滾動速度 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    滾動速度: {marqueeItem.config.speed}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={marqueeItem.config.speed}
                    onChange={(e) => handleConfigChange({ speed: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>慢</span>
                    <span>快</span>
                  </div>
                </div>

                {/* 滾動方向 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    滾動方向
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {directionOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleDirectionChange(option.value)}
                          className={cn(
                            'p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 font-medium',
                            marqueeItem.config.direction === option.value
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 進階設定 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                進階設定
              </h2>
              
              <div className="space-y-4">
                {/* 字體系列 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    字體系列
                  </label>
                  <select
                    value={marqueeItem.config.fontFamily}
                    onChange={(e) => handleConfigChange({ fontFamily: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="system-ui, sans-serif">系統預設</option>
                    <option value="'Helvetica Neue', Arial, sans-serif">Helvetica</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="'Georgia', serif">Georgia</option>
                    <option value="'Verdana', sans-serif">Verdana</option>
                  </select>
                </div>

                {/* 文字效果 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      文字陰影
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marqueeItem.config.hasTextShadow}
                        onChange={(e) => handleConfigChange({ hasTextShadow: e.target.checked })}
                        className="sr-only"
                      />
                      <div className={cn(
                        "w-11 h-6 rounded-full transition-colors",
                        marqueeItem.config.hasTextShadow ? "bg-blue-600" : "bg-gray-300"
                      )}>
                        <div className={cn(
                          "dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
                          marqueeItem.config.hasTextShadow ? "translate-x-5" : "translate-x-0"
                        )}></div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      文字邊框
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marqueeItem.config.hasBorder}
                        onChange={(e) => handleConfigChange({ hasBorder: e.target.checked })}
                        className="sr-only"
                      />
                      <div className={cn(
                        "w-11 h-6 rounded-full transition-colors",
                        marqueeItem.config.hasBorder ? "bg-blue-600" : "bg-gray-300"
                      )}>
                        <div className={cn(
                          "dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
                          marqueeItem.config.hasBorder ? "translate-x-5" : "translate-x-0"
                        )}></div>
                      </div>
                    </label>
                  </div>
                </div>
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