# 研究生學位口試行政工具

臺大經濟學系研究生口試行政流程輔助工具。

## 功能

- **📝 填寫資料** — 學生基本資料、論文題目、口試時間地點、口試委員名單（含校外委員匯款資訊與交通費）
- **📄 申請單** — 可列印的正式申請單，含簽名欄
- **📊 Excel 紀錄** — 一鍵複製 tab 分隔列，直接貼入追蹤表
- **🏛 場地資訊** — 場地借用資訊整理卡片
- **💴 核銷文件** — 費用核銷明細表（金額欄位空白）＋ 校外委員匯款資料彙整

## 本地開發

```bash
npm install
npm run dev
```

## 建置與部署

```bash
npm run build
# dist/ 資料夾即可部署至任何靜態托管服務
```

### GitHub Pages 部署

1. `vite.config.js` 中的 `base` 改為你的 repo 名稱，例如：
   ```js
   base: '/thesis-defense-tool/',
   ```
2. 建置：`npm run build`
3. 將 `dist/` 內容推至 `gh-pages` 分支，或使用 GitHub Actions 自動部署。

### Vercel / Netlify

直接連結 repo，framework 選 **Vite**，build command `npm run build`，output directory `dist`。

## 技術

- React 18 + Vite
- 無外部 UI 套件，純 inline style
- 字型：Noto Sans TC / Noto Serif TC（Google Fonts）
