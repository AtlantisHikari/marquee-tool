import { MarqueeDisplay } from './components/MarqueeDisplay';
import { ControlPanel } from './components/ControlPanel';
import { useMarquee } from './hooks/useMarquee';
import { X } from 'lucide-react';

function App() {
  const { config, updateConfig, enterFullscreen, exitFullscreen } = useMarquee();

  return (
    <div className="min-h-screen bg-gray-50">
      {config.isFullscreen ? (
        // 全屏模式
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={exitFullscreen}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            title="退出全屏 (ESC)"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <MarqueeDisplay 
            config={config} 
            className="w-full h-full"
          />
        </div>
      ) : (
        // 普通模式
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
            <div className="max-w-7xl mx-auto">
              <header className="text-center mb-4 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  🎪 跑馬燈工具
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  創建漂亮的跑馬燈顯示，支援多種自定義選項
                </p>
              </header>

              {/* 移動優先的佈局 */}
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8">
                {/* 預覽區域 - 移動端優先顯示 */}
                <div className="lg:col-span-2 lg:order-2">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
                      <h3 className="font-medium text-sm sm:text-base">📺 即時預覽</h3>
                      <div className="text-xs sm:text-sm text-gray-300">
                        {config.isPlaying ? '▶️ 播放中' : '⏸️ 已暫停'}
                      </div>
                    </div>
                    {/* 響應式高度 */}
                    <div className="h-48 sm:h-64 md:h-80 lg:h-96">
                      <MarqueeDisplay 
                        config={config}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* 使用說明 - 移動端可摺疊 */}
                  <details className="mt-4 sm:mt-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <summary className="p-3 sm:p-4 cursor-pointer font-medium text-blue-800 text-sm sm:text-base">
                      💡 使用提示 (點擊展開)
                    </summary>
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                      <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                        <li>• 點擊「全屏顯示」可進入全屏跑馬燈模式</li>
                        <li>• 全屏模式下按空白鍵可暫停/播放</li>
                        <li>• 按 ESC 鍵退出全屏模式</li>
                        <li>• 設定會自動儲存到本地瀏覽器中</li>
                        <li>• 手機/平板可旋轉螢幕獲得更好體驗</li>
                      </ul>
                    </div>
                  </details>
                </div>

                {/* 控制面板 */}
                <div className="lg:col-span-1 lg:order-1">
                  <ControlPanel
                    config={config}
                    onConfigChange={updateConfig}
                    onFullscreen={enterFullscreen}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;