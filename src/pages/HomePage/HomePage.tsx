import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarqueeManager } from '../../hooks/useMarqueeManager';
import { 
  Plus, 
  Play, 
  Settings, 
  Trash2, 
  Copy, 
  Calendar,
  Home,
  Monitor
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    marqueeItems, 
    createMarquee, 
    deleteMarquee, 
    duplicateMarquee,
    setCurrentItemId,
    getTotalCount 
  } = useMarqueeManager();
  
  const [showNewMarqueeDialog, setShowNewMarqueeDialog] = useState(false);
  const [newMarqueeName, setNewMarqueeName] = useState('');

  const handleCreateMarquee = () => {
    if (!newMarqueeName.trim()) return;
    
    const id = createMarquee(newMarqueeName.trim());
    setCurrentItemId(id);
    setNewMarqueeName('');
    setShowNewMarqueeDialog(false);
    navigate(`/settings/${id}`);
  };

  const handlePlayMarquee = (id: string) => {
    setCurrentItemId(id);
    navigate(`/play/${id}`);
  };

  const handleEditMarquee = (id: string) => {
    setCurrentItemId(id);
    navigate(`/settings/${id}`);
  };

  const handleDeleteMarquee = (id: string, name: string) => {
    if (confirm(`確定要刪除「${name}」嗎？`)) {
      deleteMarquee(id);
    }
  };

  const handleDuplicateMarquee = (id: string) => {
    const newId = duplicateMarquee(id);
    if (newId) {
      setCurrentItemId(newId);
      navigate(`/settings/${newId}`);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" style={{ padding: '16px 24px' }}>
      {/* 頂部標題區 */}
      <div className="bg-white shadow-sm border-b rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                🎪 跑馬燈數位看板
              </h1>
              <p className="text-gray-600 text-lg sm:text-xl">
                用跑馬燈幫你放大文字，應援你的創意
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
              {/* 快速跳轉按鈕 - 只在較大螢幕顯示 */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  title="主頁"
                >
                  <Home className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="p-3 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  title="設定"
                >
                  <Settings className="w-6 h-6" />
                </button>
                <button
                  className="p-3 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  title="全螢幕"
                >
                  <Monitor className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg text-gray-500 ml-auto">
                  共 {getTotalCount()} 個項目
                </span>
                <button
                  onClick={() => setShowNewMarqueeDialog(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl text-lg"
                >
                  <Plus className="w-6 h-6" />
                  新增跑馬燈
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主內容區 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {marqueeItems.length === 0 ? (
          // 空狀態
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Play className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-3">
              目前還沒有跑馬燈被建立哦！
            </h3>
            <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg">
              按下「新增跑馬燈」，創建你的第一個數位看版
            </p>
            <button
              onClick={() => setShowNewMarqueeDialog(true)}
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-xl"
            >
              <Plus className="w-7 h-7" />
              馬上去新增
            </button>
          </div>
        ) : (
          // 跑馬燈列表
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marqueeItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100"
              >
                {/* 預覽區域 */}
                <div 
                  className="h-32 p-4 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ backgroundColor: item.config.backgroundColor }}
                  onClick={() => handlePlayMarquee(item.id)}
                >
                  <div 
                    className="text-center font-medium truncate"
                    style={{ 
                      color: item.config.textColor,
                      fontSize: `${Math.min(item.config.fontSize, 24)}px`,
                      fontFamily: item.config.fontFamily
                    }}
                  >
                    {item.config.text || '預覽文字'}
                  </div>
                </div>

                {/* 資訊區域 - 可點擊進入設定 */}
                <div 
                  className="p-6 border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleEditMarquee(item.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-xl">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-base text-gray-500 mt-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.updatedAt)}
                      </div>
                    </div>
                  </div>

                  {/* 操作按鈕 */}
                  <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handlePlayMarquee(item.id)}
                      className="flex-1 inline-flex items-center justify-center gap-3 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-medium transition-colors"
                    >
                      <Monitor className="w-5 h-5" />
                      全螢幕播放
                    </button>
                    <button
                      onClick={() => handleEditMarquee(item.id)}
                      className="flex-1 inline-flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-medium transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      設定
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDuplicateMarquee(item.id)}
                        className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="複製"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMarquee(item.id, item.name)}
                        className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="刪除"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 新增跑馬燈對話框 */}
      {showNewMarqueeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                新增跑馬燈
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    名稱
                  </label>
                  <input
                    type="text"
                    value={newMarqueeName}
                    onChange={(e) => setNewMarqueeName(e.target.value)}
                    placeholder="輸入跑馬燈名稱..."
                    className="w-full px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateMarquee()}
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowNewMarqueeDialog(false);
                    setNewMarqueeName('');
                  }}
                  className="flex-1 px-4 py-6 text-xl text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateMarquee}
                  disabled={!newMarqueeName.trim()}
                  className="flex-1 px-4 py-6 text-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                >
                  新增
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};