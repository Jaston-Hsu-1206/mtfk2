| 設定項目 | 內容說明 |
| :--- | :--- |
| **核心能力** | 對指定 LINE 用戶發送文字訊息 |
| **呼叫對象** | 呼叫名為 `line` 的 MCP 伺服器 |
| **使用工具** | 使用 `push_message` 工具（也就是 LINE 官方提供的「主動發送推播」功能） |
| **發送對象 (to)** | 系統自動讀取 `.env` 裡的 `DESTINATION_USER_ID`，不需要手動指定 |
| **發送內容 (text)** | 由流程 (Workflow) 傳入剛剛 Persona 產生的推播訊息文字 |


| **設定項目** | **內容說明** |
| :--- | :--- |
| **系統名稱** | `ch06-天下茶屋-Line推播` |
| **模型** | `gemini-2.5-flash-lite` |
| **Role (系統角色)** | 負責接收訂單資料，並**主動生成**一句通知客人的簡訊（例如：「您的飲品已製作中...」），再將文字交給 Skill 去發送。 |
| **Tool** | `line:push_message` |
| **Goal (目標)** | 在結帳流程結束時，自動將訂單資訊透過 LINE 通知客戶。 |
| **Constraint (約束)** | 嚴禁在 Role 裡直接寫金鑰；推播文字需簡短親切；若用戶未加好友，應提醒對方加好友。 |
| **Knowledge (知識)** | API Key 存放在 `.env` 檔案的 `LINE_CHANNEL_ACCESS_TOKEN` 變數中；接收對象 ID 存在 `DESTINATION_USER_ID`。 |