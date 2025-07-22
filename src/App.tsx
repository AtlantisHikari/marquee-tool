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
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🎪 跑馬燈工具
              </h1>
              <p className="text-gray-600">
                創建漂亮的跑馬燈顯示，支援多種自定義選項
              </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* 控制面板 */}
              <div className="lg:col-span-1">
                <ControlPanel
                  config={config}
                  onConfigChange={updateConfig}
                  onFullscreen={enterFullscreen}
                />
              </div>

              {/* 預覽區域 */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
                    <h3 className="font-medium">📺 即時預覽</h3>
                    <div className="text-sm text-gray-300">
                      {config.isPlaying ? '▶️ 播放中' : '⏸️ 已暫停'}
                    </div>
                  </div>
                  <div className="h-64 md:h-80 lg:h-96">
                    <MarqueeDisplay 
                      config={config}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* 使用說明 */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">💡 使用提示</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 點擊「全屏顯示」可進入全屏跑馬燈模式</li>
                    <li>• 全屏模式下按空白鍵可暫停/播放</li>
                    <li>• 按 ESC 鍵退出全屏模式</li>
                    <li>• 設定會自動儲存到本地瀏覽器中</li>
                  </ul>
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