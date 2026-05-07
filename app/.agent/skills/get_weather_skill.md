---
功能名稱: 氣候感測技能 (Get Weather Skill)
版本編號: v1.0.0
修改日期: 2026-04-23
功能類型: 環境感知 / MCP 對接技能
內容描述: 透過 MCP Server「weather」之 get_weather 工具取得即時氣溫，提供給 Persona 與 Rules 作為決策依據。
---

# 核心技能：氣候感測 (Get Weather Skill)

## 1. 基礎實作規劃 (人類好閱讀版)

本技能為 App 開啟「環境感知」能力，透過 MCP 協定對接外部氣象服務：

### 技能職責

- **核心能力**：取得指定城市當前氣溫數字。
- **呼叫對象**：MCP Server 名為 `weather`（即 `@mariox/weather-mcp-server`）。
- **呼叫工具**：Server 提供的 `get_weather` 工具（名稱來自套件官方文件，可透過 Part 2 Step D-1「你現在有哪些 MCP 工具可以用？」確認）。
- **參數來源**：讀取 Knowledge `product_list.md` 中「店鋪資料」的天氣查詢城市（本店：`Indonesia `）。

### 執行流程

1. 從 Knowledge 讀取天氣查詢城市（`Indonesia `）。
2. 透過 MCP 呼叫 `weather` Server 的 `get_weather(city="Indonesia ")`。
3. 回傳氣溫數值（°C），供 Workflow S0 或 Persona 使用。

### 失敗處理

- 若 Server 無回應或參數錯誤 → 回傳空值，Workflow 改走「通用推薦」備援路徑（不中斷服務）。

---

## 2. 進階實作規格 (AI好理解版)

### 技能呼叫規格 (Skill Specification)

| 欄位 (Field) | 內容 (Value) |
| :--- | :--- |
| **mcp_server** | `weather` |
| **tool_name** | `get_weather` |
| **input_param** | `city: string`（來源：Knowledge 天氣查詢城市） |
| **output_field** | `current_temp: number` (°C) |

### 錯誤處理矩陣 (Error Handling)

| 錯誤情境 (Scenario) | 處理動作 (Action) | 降級輸出 (Fallback) |
| :--- | :--- | :--- |
| Server 未啟動 | 回報「氣候感測暫時無法使用」 | 顯示預設推薦（不套用 weather_recommendation） |
| 城市名不合法 | 回報參數錯誤 | 提示改用 `Indonesia `（英文） |
| 網路逾時 | 重試 1 次，仍失敗則降級 | 同上 |
