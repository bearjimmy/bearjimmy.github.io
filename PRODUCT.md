# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JavaScript，無框架、無建置步驟；部署目標 GitHub Pages（bearjimmy.github.io）。

## Users

- 主要：AI 應用開發／金融科技職缺的面試官與 HR。看完 104 履歷或應徵訊息後點進來，想在一兩分鐘內確認「這個人實際做過什麼」。
- 次要：技術主管或工程師。會點進 GitHub、論文全文，看方法和程式。

## Product Purpose

孟祥竣（Bright Meng）的個人作品網頁。把散在 GitHub、SSRN、PDF 裡的論文、專案、經歷整理成一個連結，放進履歷和應徵訊息。成功的定義是訪客看完後覺得「這個人動手能力強、做得出東西」，並願意聯絡或安排面試。

## Positioning

銀行兩年（陽信、元大）轉 AI 應用開發。和一般轉職者不同的地方是有實際做完、可以點開的東西：一篇放上 SSRN 的金融 RAG 論文、自己會用的工具、團隊上線的資料管線、正在比賽的 Agent。

## Operating Context

- 訪客通常從 104 履歷、Cake、應徵訊息裡的連結進來，桌機與手機都有。
- 會被拿來和履歷 PDF 對照，內容必須和履歷一致（時序：銀行 → 資展 AIPE03 → 論文）。

## Capabilities and Constraints

- 互動核心：卡片漂浮在 3D 球面上，可拖曳旋轉、點擊聚焦展開內容、依類別篩選。使用者明確要保留這個互動（參考 polakuma.studio/gallery 的概念，程式自行重寫）。
- 下方保留一般清單，給不操作特效的人、搜尋引擎與列印。
- 內容集中在 `data.js`，改內容不需動程式。
- 玉山 AI CUP 比賽進行中（初賽 2026/10/27–11/27），策略細節不得公開。
- 預約網站是朋友的案子，不附連結。

## Brand Commitments

- 文案不要 AI 腔：不用「賦能」這類口號、不堆粗體，句子要像本人講話。
- 研究結論不把話說死，用「目前還不顯著」「仍在驗證中」。
- 培訓單位寫「資展國際」，班名「AI × Python 工程師訓練班」AIPE03。

## Evidence on Hand

- 論文：SSRN https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7553938（與楊德倫老師合著）
- GitHub：https://github.com/bearjimmy （JobLens、tw-stock-strategy-validation）；團隊專案 https://github.com/our-best-project/Justmarket
- 104 履歷：https://pda.104.com.tw/profile/share/gy6m3ts0pJ2KMdl2V9TIr7BKbRU12wph
- 聯絡 Email：ok1738ok@gmail.com
- 沒有：推薦語、客戶名單、照片、作品截圖以外的圖像素材。不得杜撰。

## Product Principles

1. 先讓人看到「做出來的東西」，再講背景。
2. 每個說法都要點得開：連到 repo、論文或具體數字。
3. 特效是入口不是門檻：不玩特效也能在清單裡找到所有內容。
4. 誠實優先：結果不好看也照實寫。

## Accessibility & Inclusion

鍵盤可操作、支援 prefers-reduced-motion、手機可用。只做淺色版：使用者明確不要「太暗、太科技感」。
