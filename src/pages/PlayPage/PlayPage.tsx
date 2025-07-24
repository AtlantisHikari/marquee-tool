import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarqueeManager } from '../../hooks/useMarqueeManager';
import { MarqueeDisplay } from '../../components/MarqueeDisplay';
import { Settings, Home, Play, Pause, Monitor } from 'lucide-react';

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

  // 進入全螢幕模式並防止頁面滾動
  useEffect(() => {
    // 隱藏滾動條
    document.body.style.overflow = 'hidden';
    
    // 嘗試進入全螢幕模式
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).mozRequestFullScreen) {
          await (document.documentElement as any).mozRequestFullScreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
          await (document.documentElement as any).msRequestFullscreen();
        }
      } catch (error) {
        console.log('無法進入全螢幕模式:', error);
      }
    };
    
    // 延遲執行以避免瀏覽器阻擋
    const timer = setTimeout(enterFullscreen, 100);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      
      // 退出全螢幕模式
      if (document.fullscreenElement || (document as any).webkitFullscreenElement || 
          (document as any).mozFullScreenElement || (document as any).msFullscreenElement) {
        try {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
          }
        } catch (error) {
          console.log('無法退出全螢幕模式:', error);
        }
      }
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
    <div 
      className="fixed inset-0"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: marqueeItem.config.backgroundColor,
      }}
    >
      {/* 控制列 - 絕對定位在右上角 */}
      <div 
        className="absolute z-50 flex gap-3"
        style={{
          top: '20px',
          right: '20px',
        }}
      >
        {/* 主頁按鈕 */}
        <button
          onClick={() => navigate('/')}
          className="w-16 h-16 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
          title="主頁 (ESC)"
        >
          <Home className="w-7 h-7" />
        </button>

        {/* 設定按鈕 */}
        <button
          onClick={() => navigate(`/settings/${id}`)}
          className="w-16 h-16 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
          title="設定"
        >
          <Settings className="w-7 h-7" />
        </button>

        {/* 全螢幕按鈕 */}
        <button
          className="w-16 h-16 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
          title="全螢幕模式"
        >
          <Monitor className="w-7 h-7" />
        </button>

        {/* 播放/暫停按鈕 */}
        <button
          onClick={togglePlayPause}
          className="w-16 h-16 bg-green-600/80 hover:bg-green-700/80 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
          title={marqueeItem.config.isPlaying ? '暫停 (空白鍵)' : '播放 (空白鍵)'}
        >
          {marqueeItem.config.isPlaying ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-0.5" />
          )}
        </button>
      </div>

      {/* 跑馬燈顯示區域 - 真正佔滿整個螢幕 */}
      <div 
        className="absolute inset-0"
        style={{
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
        }}
      >
        <MarqueeDisplay 
          config={marqueeItem.config}
          className="w-full h-full"
        />
      </div>

      {/* 底部提示 */}
      <div 
        className="absolute z-40"
        style={{
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="bg-black/40 text-white px-6 py-3 rounded-full text-lg backdrop-blur-sm opacity-80 hover:opacity-100 transition-opacity">
          <span className="hidden sm:inline">空白鍵: 播放/暫停 • ESC: 退出 • </span>
          {marqueeItem.name}
        </div>
      </div>
    </div>
  );
};