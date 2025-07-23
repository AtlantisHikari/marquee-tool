import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarqueeManager } from '../../hooks/useMarqueeManager';
import { MarqueeDisplay } from '../../components/MarqueeDisplay';
import { Settings, Home, Play, Pause } from 'lucide-react';

export const PlayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getMarqueeById, 
    setCurrentItemId, 
    updateCurrentConfig,
    currentMarquee 
  } = useMarqueeManager();

  // 設定當前跑馬燈
  useEffect(() => {
    if (id) {
      setCurrentItemId(id);
    }
  }, [id, setCurrentItemId]);

  const marqueeItem = id ? getMarqueeById(id) : null;

  // 鍵盤快捷鍵
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (currentMarquee) {
        updateCurrentConfig({ 
          isPlaying: !currentMarquee.config.isPlaying 
        });
      }
    }
    if (e.code === 'Escape') {
      navigate('/');
    }
  }, [currentMarquee, updateCurrentConfig, navigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // 防止頁面滾動
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!marqueeItem) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">跑馬燈不存在</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            返回主頁
          </button>
        </div>
      </div>
    );
  }

  const togglePlayPause = () => {
    updateCurrentConfig({ 
      isPlaying: !marqueeItem.config.isPlaying 
    });
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* 控制列 - 只在需要時顯示 */}
      <div className="absolute top-0 right-0 z-50 p-4 flex gap-2">
        {/* 播放/暫停按鈕 */}
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
          title={marqueeItem.config.isPlaying ? '暫停 (空白鍵)' : '播放 (空白鍵)'}
        >
          {marqueeItem.config.isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        {/* 設定按鈕 */}
        <button
          onClick={() => navigate(`/settings/${id}`)}
          className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
          title="設定"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* 返回主頁按鈕 */}
        <button
          onClick={() => navigate('/')}
          className="w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
          title="返回主頁 (ESC)"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      {/* 跑馬燈顯示區域 - 佔滿整個螢幕 */}
      <div className="flex-1 relative">
        <MarqueeDisplay 
          config={marqueeItem.config}
          className="w-full h-full"
        />
      </div>

      {/* 底部提示 - 淡出效果 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-black/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm opacity-70 hover:opacity-100 transition-opacity">
          <span className="hidden sm:inline">空白鍵: 播放/暫停 • ESC: 退出 • </span>
          {marqueeItem.name}
        </div>
      </div>

    </div>
  );
};