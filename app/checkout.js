/**
 * 天下茶屋 App - 結帳與雲端同步功能
 * 實作 Turso 資料庫同步邏輯
 */

// Turso 配置 (建議從環境變數或安全配置注入)
const TURSO_CONFIG = {
    url: "libsql://tenka-tea-db-jaston1206.aws-ap-northeast-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzg3NTg5NDcsImlkIjoiMDE5ZTI2NGItMDMwMS03ZmY1LWI4ZTEtMzFkNjJmODA1ZDUxIiwicmlkIjoiYmYzZjM4MmItNWFmYS00NGQ5LTk4MGYtMzdlNzAyMDNkMDViIn0.eGWg-HXZb-r9PV_gJhtuM-lQUdsjlX0j9hpvcIEwZ4FTTMa5nsAR-IPxRcB8oDFi6WIJ9YyZT2aJx8OWgtJhAQ"
};

/**
 * 同步訂單至 Turso 雲端資料庫
 * @param {Array} cart - 購物車資料
 */
export async function syncOrderToTurso(cart) {
    if (!cart || cart.length === 0) return;

    try {
        // 動態引入 SDK (如果 index.html 沒載入的話，確保可用)
        const { createClient } = await import('https://esm.sh/@libsql/client@0.17.3/web');
        const client = createClient(TURSO_CONFIG);

        // 建立訂單編號 (UUID)
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // 準備批量寫入的 SQL 指令 (對齊 db_storage_skill.md 規範)
        const queries = cart.map(item => ({
            sql: "INSERT INTO orders (order_id, item_name, qty, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)",
            args: [
                orderId,
                item.name,
                1, // 數量
                item.price, // 單價
                item.price  // 小計 (目前未考慮多件，先以單價填入)
            ]
        }));

        // 執行事務處理
        await client.batch(queries, "write");

        console.log(`Order ${orderId} synced successfully to Turso.`);
        return orderId;
    } catch (error) {
        console.error("Failed to sync order to Turso:", error);
        throw error;
    }
}

// 導出至全域以便 index.html 直接使用 (非模組化環境兼容)
window.syncOrderToTurso = syncOrderToTurso;
