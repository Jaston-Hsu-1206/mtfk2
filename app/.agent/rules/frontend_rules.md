# Frontend Development Rules - LibSQL Web Integration

為了確保前端 HTML 頁面具備直接與 Turso 雲端資料庫互動的能力，所有前端開發必須遵循以下規範：

## 1. SDK 引入規範
所有 HTML 頁面必須在 `<head>` 區塊中引入 **LibSQL Web Client SDK**。為了確保穩定性與載入速度，請使用 ESM CDN 版本。

### 推薦 CDN 連結：
`https://esm.sh/@libsql/client@0.17.3/web`

### 程式碼範例：
請在 `<head>` 中加入以下結構（或在模組化腳本中引入）：

```html
<script type="module">
  import { createClient } from 'https://esm.sh/@libsql/client@0.17.3/web';

  // 初始化客戶端（建議透過環境變數或安全配置注入 URL 與 Token）
  const client = createClient({
    url: "YOUR_TURSO_DB_URL",
    authToken: "YOUR_TURSO_DB_TOKEN",
  });

  // 範例：測試連線
  // const rs = await client.execute("SELECT 1");
</script>
```

## 2. 功能目標
*   **直接寫入能力**：確保前端具備直接執行 SQL 指令（如 `INSERT`, `UPDATE`）的能力，無需完全依賴中間層 API。
*   **Web 兼容性**：必須使用 `/web` 入口點，以確保在瀏覽器環境中運作正常。

## 3. 安全注意事項
> [!WARNING]
> 在前端直接暴露 `authToken` 具有安全風險。在正式環境中，請務必使用限制權限的 Token，或考慮透過後端 Proxy 進行轉發，除非該應用程式為受信任的內部工具。

---
**建立日期**：2026-05-14
**版本**：v1.0.0
