// 卡片內容。改這個檔案就能更新網站，不用動 main.js。
// type: research | project | experience | skill
window.CARDS = [
  {
    id: 'paper',
    when: '2026.10',
    type: 'research',
    tag: '論文',
    title: '金融 RAG 的|拒答把關',
    sub: 'SSRN 預印本・2026',
    body: [
      'Calibrated Gating in Financial RAG: Small External Controllers versus LLM Self-Assessment across Model Scales。與楊德倫老師合著。',
      'RAG 系統除了要答對，也要知道什麼時候該拒答。我比較兩種把關方式：讓 LLM 自己評估，或另外放一個小模型當外部判斷者，並觀察模型從 0.6B 放大到 14B 時誰比較可靠。',
      '實驗全部在 8GB 顯卡的筆電上用 Ollama 跑 Qwen3 量化模型，資料集涵蓋 TMMLU+ 財經科目、FinQA 與 StockNet，每個設定跑 3 個 seed。',
      '主要發現：判斷「資料夠不夠回答」時，小模型的校準遠比 LLM 自評好；判斷「答案對不對」則要看模型大小，4B 以上自評較準。修正資料洩漏後有一個結果消失，論文照實改寫。'
    ],
    stack: ['Ollama', 'Qwen3', 'BGE-M3', '校準', 'AUROC / ECE'],
    links: [{ label: 'SSRN 全文', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7553938' }]
  },
  {
    id: 'joblens',
    when: '2026.09',
    type: 'project',
    tag: '個人專案',
    title: 'JobLens 職缺透鏡',
    sub: 'Flask・求職工具',
    body: [
      '求職時 104 分頁越開越多、投遞紀錄記不清，所以做了這個工具給自己用：職缺搜尋、收藏、投遞進度和相似職缺推薦放在同一頁。',
      '推薦用規則計分而不是機器學習，每一筆都說得出被推薦的原因。抽樣 640 筆真實職缺後發現薪資單位會判錯，改成以 104 的薪資代碼為準。',
      '有 48 個 pytest 測試，每次 push 由 GitHub Actions 在兩個 Python 版本上執行。'
    ],
    stack: ['Python', 'Flask', 'SQLite', 'pytest', 'GitHub Actions'],
    links: [{ label: 'GitHub', url: 'https://github.com/bearjimmy/JobLens' }]
  },
  {
    id: 'justmarket',
    when: '2026',
    type: 'project',
    tag: '團隊專案',
    title: '就事論市',
    sub: '台股事件平台・資展 AIPE03',
    short: '台股事件平台',
    body: [
      '把每天上千則財經新聞收斂成少數「事件」，標出重要性與市場反應。只描述已發生的反應，不預測、不報明牌。',
      '管線：爬蟲 → BGE-M3 向量化 → 事件聚類 → LLM 摘要分類 → 重要性評分，資料存在 PostgreSQL + pgvector。',
      '我負責重要性評分與市場驗證模組，用 FinMind 的籌碼資料比對事件發生後的市場反應。'
    ],
    stack: ['Python', 'pgvector', 'FastAPI', 'FinMind', 'Prefect'],
    links: [{ label: 'GitHub', url: 'https://github.com/our-best-project/Justmarket' }]
  },
  {
    id: 'twstock',
    when: '2026.09',
    type: 'project',
    tag: '個人研究',
    title: '台股策略|驗證紀錄',
    sub: '對照實驗・回測',
    body: [
      '用對照實驗檢查自己原本在用的選股策略：同一檔股票隨機挑日子進場，結果反而比訊號日進場好，所以停用，而不是繼續調參數。',
      '接著驗證 52 週高點接近度等因子，相對全市場有超額報酬，但相對 0050 目前還不顯著，仍在驗證中。',
      '記錄了 13 項方法的白話說明，以及和 AI 協作時犯過的錯誤。'
    ],
    stack: ['Python', 'pandas', '走動式驗證', 'XQ XScript'],
    links: [{ label: 'GitHub', url: 'https://github.com/bearjimmy/tw-stock-strategy-validation' }]
  },
  {
    id: 'esun',
    when: '2026.10',
    type: 'project',
    tag: '競賽',
    title: '玉山 AI CUP|Agent 基金經理人',
    sub: '2026 初賽進行中',
    body: [
      '打造一個每天自主決定台股投資組合的 Agent。設計原則是數字交給程式、文字交給 LLM：LLM 只負責審查與說明，配置和合規檢查都由程式完成。',
      '用歷史資料做了 3,672 個交易日的規則稽核，持倉與交易規則零違規。',
      '比賽進行中，策略細節賽後再公開。'
    ],
    stack: ['Python', 'LLM Agent', 'JSON Schema', '回測'],
    links: []
  },
  {
    id: 'booking',
    when: '2026.08',
    type: 'project',
    tag: '接案',
    title: '心理工作室|預約網站',
    sub: 'Next.js・開發完成待上線',
    short: 'Next.js・待上線',
    body: [
      '幫朋友的心理工作室做的線上預約系統：客人免註冊，用預約編號加電話查詢與取消；後台設定每週班表與例外日。',
      '時段計算寫成純函式並有 15 個測試；通知走 LINE Messaging API。'
    ],
    stack: ['Next.js', 'Supabase', 'LINE API'],
    links: []
  },
  {
    id: 'aipe',
    when: '2026',
    type: 'experience',
    tag: '受訓',
    title: '資展國際 AIPE03',
    sub: 'AI × Python 工程師訓練班・2026',
    short: 'AI × Python 訓練班',
    body: [
      '離開銀行後全職受訓，學 Python、機器學習、NLP 與 LLM 應用開發，期間完成團隊專案「就事論市」。',
      '結訓後與在資展認識的楊德倫老師合作，完成金融 RAG 論文。'
    ],
    stack: [],
    links: []
  },
  {
    id: 'yuanta',
    when: '2025.08',
    type: 'experience',
    tag: '經歷',
    title: '元大商業銀行',
    sub: '辦事員・2025/08–2026/02',
    short: '辦事員',
    body: ['處理銀行作業流程與文件，熟悉金融業的法遵要求與作業正確性。'],
    stack: [],
    links: []
  },
  {
    id: 'sunny',
    when: '2024.03',
    type: 'experience',
    tag: '經歷',
    title: '陽信商業銀行',
    sub: '櫃員・2024/03–2025/04',
    short: '櫃員',
    body: ['臨櫃作業與客戶服務。'],
    stack: [],
    links: []
  },
  {
    id: 'yzu',
    when: '',
    type: 'experience',
    tag: '學歷',
    title: '元智大學',
    sub: '國際企業學系 學士',
    body: ['大學主修國際企業。'],
    stack: [],
    links: []
  },
  { id: 's-rag', type: 'skill', tag: '技能', title: 'RAG', sub: '檢索・重排・拒答', body: ['向量檢索、BM25 與混合檢索、reranker，以及用小模型判斷證據是否足夠。'], stack: [], links: [] },
  { id: 's-local', type: 'skill', tag: '技能', title: '地端 LLM', sub: 'Ollama・量化模型', body: ['在 8GB 顯卡上部署與評測 0.6B 到 14B 的量化模型，不依賴雲端 API。'], stack: [], links: [] },
  { id: 's-eval', type: 'skill', tag: '技能', title: '評估與校準', sub: 'AUROC・ECE・多 seed', body: ['設計評測資料、防止資料洩漏、用信賴區間和多個 seed 判斷結果是不是真的。'], stack: [], links: [] },
  { id: 's-py', type: 'skill', tag: '技能', title: 'Python', sub: 'pandas・Flask・FastAPI', short: 'pandas・FastAPI', body: ['資料處理、後端 API、爬蟲與排程，配合 pytest 與 GitHub Actions。'], stack: [], links: [] },
  { id: 's-sql', type: 'skill', tag: '技能', title: 'SQL', sub: 'PostgreSQL・SQLite', body: ['資料查詢與整理，包含 pgvector 向量檢索。'], stack: [], links: [] },
  { id: 's-fin', type: 'skill', tag: '技能', title: '金融資料', sub: 'FinMind・MOPS・XQ', body: ['台股價量、籌碼與月營收資料的取得、清理與回測，注意還原價與前視偏誤。'], stack: [], links: [] },
  { id: 's-ai', type: 'skill', tag: '技能', title: 'AI 協作開發', sub: 'Claude Code', body: ['用 AI 工具加快開發，但自己負責設計、驗證與審查，並記錄 AI 犯過的錯。'], stack: [], links: [] },
  { id: 'c-trust', type: 'skill', tag: '證照', title: '信託業務', sub: '金融證照', body: ['信託業業務人員資格。'], stack: [], links: [] },
  { id: 'c-sitc', type: 'skill', tag: '證照', title: '投信投顧法規', sub: '金融證照', body: ['投信投顧相關法規測驗。'], stack: [], links: [] },
  { id: 'c-toeic', type: 'skill', tag: '語言', title: '多益 775', sub: 'TOEIC', body: ['能閱讀英文技術文件與論文，並以英文撰寫論文。'], stack: [], links: [] }
];
