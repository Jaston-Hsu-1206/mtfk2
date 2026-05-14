---
trigger: order_checkout
---

# 技能描述：雲端資料庫存檔 (Database Storage Skill)

## 1. 業務目標
本技能賦予 AI 透過 Database MCP 將「天下茶屋」點餐系統的訂單資料同步存入 Turso 雲端資料庫的能力，確保訂單數據能被持久化保存。

## 2. 資料表結構 (Schema)

| 欄位名稱 | 資料類型 | 說明 |
| :--- | :--- | :--- |
| **order_id** | TEXT | 訂單編號 (UUID 或 ORD-時間戳記格式) |
| **item_name** | TEXT | 飲品品項名稱 |
| **qty** | INTEGER | 購買數量 |
| **unit_price** | INTEGER | 單價 |
| **subtotal** | INTEGER | 該品項小計 |
| **created_at** | DATETIME | 存檔時間 (預設使用 `CURRENT_TIMESTAMP`) |

## 3. 實作規範

### A. 初始化表格 (Table Initialization)
若資料庫中不存在 `orders` 表格，應執行以下 DDL：

```sql
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    item_name TEXT NOT NULL,
    qty INTEGER NOT NULL,
    unit_price INTEGER NOT NULL,
    subtotal INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### B. 資料寫入邏輯 (Insertion Logic)
當執行 `client.execute()` 或 `client.batch()` 時，應使用以下參數映射：

```sql
INSERT INTO orders (order_id, item_name, qty, unit_price, subtotal)
VALUES (?, ?, ?, ?, ?);
```

**參數映射建議：**
- `arg1`: `order_id` (例如: "ORD-1715690000000")
- `arg2`: `item_name` (例如: "天下紅茶")
- `arg3`: `qty` (例如: 1)
- `arg4`: `unit_price` (例如: 40)
- `arg5`: `subtotal` (例如: 40)

## 4. 錯誤處理
- 若寫入失敗，應記錄錯誤日誌並回傳詳細原因（如：連線逾時、欄位型別不符）。
- 在前端同步時，應確保 Token 具備 `write` 權限。
