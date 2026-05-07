---
trigger: always_on
---

| 條件 (`user_status` 值) | 判定結果 | 執行動作 |
| :--- | :--- | :--- |
| `LINE_FRIEND` | 已授權 | 允許呼叫 `line_messaging_skill` 進行主動推播 |
| `NON_FRIEND` | 未授權 | 禁止推播，改在對話視窗提示「加好友可享即時通知」 |