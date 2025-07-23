import { useState, useCallback, useEffect } from 'react';
import type { MarqueeItem, MarqueeConfig } from '../types/marquee';

const DEFAULT_CONFIG: MarqueeConfig = {
  text: '歡迎使用跑馬燈工具！',
  fontSize: 48,
  textColor: '#000000',
  backgroundColor: '#ffffff',
  speed: 5,
  direction: 'left',
  isPlaying: true,
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 'normal',
  fontStyle: 'normal',
  hasTextShadow: false,
  hasBorder: false,
  borderColor: '#000000',
  isFullscreen: false,
};

const STORAGE_KEY = 'marquee-items';

export const useMarqueeManager = () => {
  const [marqueeItems, setMarqueeItems] = useState<MarqueeItem[]>([]);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);

  // 從 localStorage 載入資料
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        }));
        setMarqueeItems(items);
      }
    } catch (error) {
      console.warn('載入跑馬燈資料失敗:', error);
    }
  }, []);

  // 儲存資料到 localStorage
  const saveToStorage = useCallback((items: MarqueeItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('儲存跑馬燈資料失敗:', error);
    }
  }, []);

  // 創建新跑馬燈
  const createMarquee = useCallback((name: string, config?: Partial<MarqueeConfig>) => {
    const newItem: MarqueeItem = {
      id: Date.now().toString(),
      name,
      config: { ...DEFAULT_CONFIG, ...config },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setMarqueeItems(prev => {
      const updated = [...prev, newItem];
      saveToStorage(updated);
      return updated;
    });

    return newItem.id;
  }, [saveToStorage]);

  // 更新跑馬燈
  const updateMarquee = useCallback((id: string, updates: Partial<Pick<MarqueeItem, 'name' | 'config'>>) => {
    setMarqueeItems(prev => {
      const updated = prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              ...updates, 
              updatedAt: new Date() 
            }
          : item
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // 刪除跑馬燈
  const deleteMarquee = useCallback((id: string) => {
    setMarqueeItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveToStorage(updated);
      return updated;
    });

    // 如果刪除的是當前項目，清除選擇
    if (currentItemId === id) {
      setCurrentItemId(null);
    }
  }, [currentItemId, saveToStorage]);

  // 複製跑馬燈
  const duplicateMarquee = useCallback((id: string) => {
    const originalItem = marqueeItems.find(item => item.id === id);
    if (!originalItem) return null;

    const newName = `${originalItem.name} (副本)`;
    return createMarquee(newName, originalItem.config);
  }, [marqueeItems, createMarquee]);

  // 獲取當前跑馬燈
  const getCurrentMarquee = useCallback(() => {
    if (!currentItemId) return null;
    return marqueeItems.find(item => item.id === currentItemId) || null;
  }, [currentItemId, marqueeItems]);

  // 更新當前跑馬燈配置
  const updateCurrentConfig = useCallback((configUpdates: Partial<MarqueeConfig>) => {
    if (!currentItemId) return;
    
    const currentItem = getCurrentMarquee();
    if (!currentItem) return;

    updateMarquee(currentItemId, {
      config: { ...currentItem.config, ...configUpdates }
    });
  }, [currentItemId, getCurrentMarquee, updateMarquee]);

  return {
    // 資料
    marqueeItems,
    currentItemId,
    currentMarquee: getCurrentMarquee(),
    
    // 操作方法
    createMarquee,
    updateMarquee,
    deleteMarquee,
    duplicateMarquee,
    setCurrentItemId,
    updateCurrentConfig,
    
    // 工具方法
    getMarqueeById: (id: string) => marqueeItems.find(item => item.id === id),
    getTotalCount: () => marqueeItems.length,
  };
};