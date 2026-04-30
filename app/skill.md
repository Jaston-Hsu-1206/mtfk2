---
id: calculate_muntjac_price
name: 計算山羌茶坊訂單金額
version: 1.0.0
author: AI Agent
description: 根據山羌茶坊的特色飲品、加料（如手工芋圓、珍珠）及優惠活動，計算訂單總金額。
---

# Skill: 計算山羌茶坊訂單金額 (`calculate_muntjac_price`)

## 功能描述 (Function Description)

此技能負責根據顧客所點選的飲品（包含秘境高山青茶、山羌特調系列等）、加料選項（如招牌手工芋圓）以及可能存在的節慶折扣（例如：山林季優惠），精確計算出訂單的最終總金額。

在執行計價前，此技能會協同檢核相關的客製化規則（如 `muntjac_special_sugar_rule`：山羌特調不可無糖規則），確保訂單內容完全符合茶坊的製作標準後，才會進行最終的價格加總，並提供帶有山羌茶坊風格的詳細金額明細。

## 輸入參數 (Input Parameters)

*   `drinks` (Array): 顧客點選的飲品列表，包含：
    *   `name`: 飲品名稱（如：山羌特調奶茶）
    *   `size`: 大小（M / L）
    *   `sugar`: 甜度（正常/少糖/半糖/微糖，需符合特調規則）
    *   `ice`: 冰塊（正常/少冰/微冰/去冰/熱）
*   `add_ons` (Array): 額外添加的配料列表（如：手工芋圓、珍珠、椰果）。
*   `discount_code` (String, Optional): 顧客提供的優惠代碼。

## 輸出結果 (Output Result)

*   `total_amount` (Integer): 最終計算出的新台幣總金額。
*   `receipt_details` (String): 詳細的點餐明細與計價過程，方便 Agent（山羌茶坊店小二）向顧客報價。

## 執行範例 (Execution Example)

**輸入**:
*   Drinks: `[{name: "山羌特調奶茶", size: "L", sugar: "微糖", ice: "去冰"}]`
*   Add-ons: `["手工芋圓"]`
*   Discount: `null`

**輸出**:
*   `total_amount`: 80
*   `receipt_details`: 「汪！為您核對餐點：大杯山羌特調奶茶（微糖去冰）65元，加上招牌手工芋圓15元。總共是80元喔！」
