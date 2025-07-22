# 🎪 跑馬燈工具 (Marquee Tool)

一個現代化的跑馬燈顯示工具，支援多種自定義選項和全屏顯示功能。

## ✨ 功能特色

### 🎛️ 基本功能
- **文字管理**: 支援多行文字輸入和編輯
- **顯示設定**: 自由調整字體大小、顏色、背景色
- **動畫控制**: 4個方向滾動（左、右、上、下）
- **速度調整**: 10級速度控制，即時調整
- **播放控制**: 暫停/播放功能

### 🖥️ 顯示模式
- **即時預覽**: 在控制台旁邊即時查看效果
- **全屏顯示**: 支援全屏跑馬燈模式
- **響應式設計**: 適配桌面、平板、手機設備

### ⚡ 進階功能
- **本地儲存**: 設定自動保存到瀏覽器
- **快捷鍵操作**: 
  - 空白鍵：全屏模式下暫停/播放
  - ESC鍵：退出全屏模式
- **視覺效果**: 支援文字陰影、邊框等效果

## 🚀 快速開始

### 🌐 線上使用
直接訪問：https://atlantishikari.github.io/marquee-tool/

### 本地開發
```bash
npm install     # 安裝依賴
npm run dev     # 啟動開發服務器
```
訪問 http://localhost:5173

### 建構專案
```bash
npm run build
```

### 預覽建構結果
```bash
npm run preview
```

## 🛠️ 技術棧

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + 自定義 CSS 動畫
- **Build Tool**: Vite
- **Icons**: Lucide React
- **UI Components**: 自製組件 + Headless UI 概念
- **State Management**: React Hooks + localStorage

## 📁 專案結構

```
marquee-tool/
├── src/
│   ├── components/           # React 組件
│   │   ├── MarqueeDisplay/   # 跑馬燈顯示組件
│   │   ├── ControlPanel/     # 控制面板組件
│   │   └── ui/              # 通用 UI 組件
│   ├── hooks/               # 自定義 React Hooks
│   │   └── useMarquee.ts    # 跑馬燈狀態管理
│   ├── types/               # TypeScript 類型定義
│   │   └── marquee.ts       # 跑馬燈相關類型
│   ├── utils/               # 工具函數
│   │   └── cn.ts           # className 合併工具
│   ├── App.tsx             # 主應用組件
│   ├── main.tsx            # React 應用入口
│   └── index.css           # 全局樣式和動畫
├── public/                 # 靜態資源
├── dist/                   # 建構輸出目錄
└── README.md              # 專案說明
```

## 🎨 使用說明

### 基本操作
1. 在「文字內容」欄位輸入要顯示的跑馬燈文字
2. 調整字體大小、顏色、背景色等設定
3. 選擇滾動方向和速度
4. 在預覽區域查看即時效果
5. 點擊「全屏顯示」進入全屏跑馬燈模式

### 全屏模式操作
- **空白鍵**: 暫停/恢復播放
- **ESC 鍵**: 退出全屏模式
- **滑鼠點擊 X 按鈕**: 退出全屏模式

### 設定保存
所有設定會自動保存到瀏覽器的本地儲存中，下次訪問時會自動載入之前的配置。

## 🔧 自定義與擴展

### 添加新的動畫效果
在 `src/index.css` 中添加新的 `@keyframes` 動畫，並在 `MarqueeDisplay.tsx` 中添加對應的邏輯。

### 擴展控制選項
在 `src/types/marquee.ts` 中擴展 `MarqueeConfig` 類型，然後在相關組件中添加對應的控制界面。

### 添加預設模板
可以在 `useMarquee.ts` 中添加預設模板功能，讓用戶快速套用常用設定。

## 📱 瀏覽器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📄 授權

MIT License

## 🙏 致謝

感謝以下開源專案的支持：
- React
- Tailwind CSS
- Vite
- Lucide React
- TypeScript