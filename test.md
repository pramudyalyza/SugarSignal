# 📘 n8n Guide: Merge vs Aggregate Node

This guide explains the difference between **Merge** and **Aggregate** nodes in n8n, with simple examples so beginners can quickly understand when to use each.

---

# 🔹 Merge Node

The **Merge node** is used to **combine data from multiple inputs** into one.  
You use it when you have two (or more) data streams and need them together for the next step in your workflow.

---

## 🟢 1. Append
👉 Simply **sticks one list after another**. No matching, no pairing.

**Example:**
- Input 1:  
`[{name: "Alice"}, {name: "Bob"}]`
- Input 2:  
`[{name: "Charlie"}, {name: "Dana"}]`

**Output:**
`[{name: "Alice"}, {name: "Bob"}, {name: "Charlie"}, {name: "Dana"}]`

**When to use:**  
Combine results from two API calls, or merge multiple pages of data.

---

## 🟢 2. Combine by Matching Fields
👉 Works like a **database join**. It matches items when a field value is the same.

**Example:**
- Input 1 (users):  
`[{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]`
- Input 2 (orders):  
`[{userId: 1, product: "Laptop"}, {userId: 3, product: "Phone"}]`

**Output (match `id` with `userId`):**
`[{id: 1, name: "Alice", userId: 1, product: "Laptop"}]`

**When to use:**  
Enrich data by connecting items that share the same key (e.g., match customers with their orders).

---

## 🟢 3. Combine by Position
👉 Pairs items by their **row index**.

**Example:**
- Input 1:  
`[{name: "Alice"}, {name: "Bob"}, {name: "Charlie"}]`
- Input 2:  
`[{order: "Book"}, {order: "Pen"}]`

**Output:**
`[{name: "Alice", order: "Book"}, {name: "Bob", order: "Pen"}]`

⚠️ “Charlie” is left out because there’s no third item in Input 2.

**When to use:**  
When two lists are aligned in the same order (e.g., names list + emails list fetched separately but in sync).

---

## 🟢 4. Combine by All Possible Combinations
👉 Creates **every possible pair** between items from Input 1 and Input 2.  
(Like a **CROSS JOIN** in SQL.)

**Example:**
- Input 1:  
`[{name: "Alice"}, {name: "Bob"}]`
- Input 2:  
`[{order: "Book"}, {order: "Pen"}]`

**Output:**
```
[
{name: "Alice", order: "Book"},
{name: "Alice", order: "Pen"},
{name: "Bob", order: "Book"},
{name: "Bob", order: "Pen"}
]
````

**When to use:**  
Testing combinations, or generating recommendations (e.g., every user with every product).

---

## 🟢 5. SQL Query
👉 Lets you write a custom **SQL query** to merge data.  
Inputs are available as `input1`, `input2`, etc.

**Example:**
```sql
SELECT *
FROM input1
LEFT JOIN input2
ON input1.id = input2.userId
````

**When to use:**
When built-in modes don’t fit your needs, and you need precise joins or filtering.

---

## 🟢 6. Choose Branch

👉 Instead of merging, you just **pick one input** to keep.

**Example:**

* Input 1: `[{name: "Alice"}]`
* Input 2: `[{name: "Bob"}]`

If you choose Input 2 → **Output:**
`[{name: "Bob"}]`

**When to use:**
When you have two possible data flows (like from an If node) and you only want to continue with one.

---

## 🔹 Merge Node Summary

| Method               | What it does                         | Example Use Case                         |
| -------------------- | ------------------------------------ | ---------------------------------------- |
| **Append**           | Add items from Input 2 after Input 1 | Combine multiple pages of API results    |
| **Matching Fields**  | Join items when a field matches      | Match orders with customers by `id`      |
| **Position**         | Join items by their index order      | Names list + Emails list in same order   |
| **All Combinations** | Every Input1 × Input2 pair           | Generate all possible user-product pairs |
| **SQL Query**        | Custom SQL join                      | Complex joins and filtering              |
| **Choose Branch**    | Pick one input only                  | Continue only with one branch            |

---

# 🔹 Aggregate Node

The **Aggregate node** is used to **group or condense multiple items into fewer items**.
You use it when you already have one stream of data and want to collect or summarize it.

---

## 🟢 Aggregate Individual Fields

👉 Collects the values of one field from all items into a list.

**Example:**

* Input:
  `[{orderId: 101, amount: 50}, {orderId: 102, amount: 70}, {orderId: 103, amount: 30}]`

If you aggregate the field `amount`, the output is:
`{amount: [50, 70, 30]}`

**When to use:**
Turn multiple rows into a single list of values (e.g., list of all email addresses).

---

## 🟢 Aggregate All Item Data

👉 Collects **all items** into one object with a list.

**Example:**

* Input:
  `[{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]`

**Output:**

```
{
  allData: [
    {id: 1, name: "Alice"},
    {id: 2, name: "Bob"}
  ]
}
```

**When to use:**
Bundle everything into one item, like sending one email that lists all orders instead of one email per order.

---

## 🔹 Aggregate Node Summary

| Method                | What it does                          | Example Use Case                         |
| --------------------- | ------------------------------------- | ---------------------------------------- |
| **Individual Fields** | Collect values of a field into a list | Make a list of all emails from items     |
| **All Item Data**     | Put all items into one object         | Bundle transactions for one report/email |

---

# ✨ Final Rule of Thumb

* **Merge** = Combine **different streams** (like SQL joins).
* **Aggregate** = Group and summarize items **within one stream** (like SQL group/collect).

👉 If you’re thinking *“I need to bring branches together”* → use **Merge**.
👉 If you’re thinking *“I need to turn many items into one”* → use **Aggregate**.

```
