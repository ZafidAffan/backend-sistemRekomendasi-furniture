# Furniture Recommendation Backend

Backend REST API untuk aplikasi rekomendasi furniture berbasis Artificial Intelligence (AI). Sistem ini berfungsi sebagai middleware antara aplikasi frontend dan AI Recommendation Service yang dibangun menggunakan FastAPI serta database MySQL untuk menyimpan data pengguna, wishlist, keranjang, dan riwayat rekomendasi.

---

## 📌 Features

* Rekomendasi furniture berdasarkan konsep
* Rekomendasi furniture berdasarkan style
* Rekomendasi produk serupa (similar products)
* Manajemen wishlist
* Manajemen keranjang belanja
* Penyimpanan riwayat rekomendasi pengguna
* Integrasi dengan AI Recommendation Service
* Integrasi dengan MySQL Database

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MySQL
* Axios
* Dotenv
* CORS

### AI Service

* FastAPI
* Machine Learning Recommendation Engine

### Database

* MariaDB / MySQL

---

## 🏗 System Architecture

```text
Frontend Application
        │
        ▼
Node.js Backend API
        │
        ├── MySQL Database
        │
        └── FastAPI AI Recommendation Service
```

Backend ini bertugas sebagai API Gateway yang:

1. Menerima request dari frontend.
2. Mengambil data dari database MySQL.
3. Mengirim request ke AI Recommendation Service.
4. Mengembalikan response ke frontend.

---

## 📂 Project Structure

```text
backend-rpl
│
├── controllers
│   ├── aiController.js
│   ├── cartController.js
│   ├── historyController.js
│   └── wishlistController.js
│
├── routes
│   ├── aiRoutes.js
│   ├── cartRoutes.js
│   ├── historyRoutes.js
│   └── wishlistRoutes.js
│
├── db.js
├── index.js
├── package.json
└── .env
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/furniture-recommendation-backend.git
cd furniture-recommendation-backend
```

### Install Dependencies

```bash
npm install
```

### Create .env

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=furniture_recommendation

AI_API=http://127.0.0.1:8000
```

### Run Server

```bash
node index.js
```

Server akan berjalan pada:

```text
http://localhost:3000
```

---

# 🗄 Database Schema

## Table: user

```sql
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL
);
```

---

## Table: wishlist

```sql
CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Table: cart

```sql
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    qty INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Table: recommendation_history

```sql
CREATE TABLE recommendation_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id VARCHAR(50),
    recommendation_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 📡 API Documentation

---

# AI Recommendation API

Base URL:

```text
/api/ai
```

---

## Get Recommendation by Concept

### Endpoint

```http
GET /api/ai/concept
```

### Query Parameters

| Parameter | Type   | Description     |
| --------- | ------ | --------------- |
| keyword   | string | Concept keyword |

### Example Request

```http
GET /api/ai/concept?keyword=minimalis
```

### Success Response

```json
[
  {
    "product_id": "10823432018",
    "name": "MEJA TV MODERN AMERICAN CLASIC BUFFET MINIMALIS STAND TV LIVING ROOM",
    "category": "Modern TV Stand",
    "price": 3000000,
    "rating": 5,
    "shop_name": "PowerArt Jepara_NEW",
    "url": "https://www.tokopedia.com/..."
  }
]
```

---

## Get Recommendation by Style

### Endpoint

```http
GET /api/ai/style/:style
```

### Example Request

```http
GET /api/ai/style/Modern
```

### Success Response

```json
[
  {
    "product_id": "16607278667",
    "name": "SCANDIA Brun Sofa Recliner 2 Seater",
    "category": "Modern Sofa",
    "price": 5999900,
    "rating": 5,
    "shop_name": "SCANDIA Indonesia",
    "url": "https://www.tokopedia.com/..."
  }
]
```

---

## Get Similar Product Recommendation

### Endpoint

```http
GET /api/ai/similar/:productId
```

### Example Request

```http
GET /api/ai/similar/10823432018
```

### Success Response

```json
[
  {
    "product_id": "14835459451",
    "name": "meja stand tv minimalis modern",
    "category": "Modern TV Stand",
    "price": 1350000,
    "rating": 5,
    "shop_name": "berkahjepara2 furniture",
    "url": "https://www.tokopedia.com/...",
    "score": 0.758
  }
]
```

### Response Field

| Field | Description                            |
| ----- | -------------------------------------- |
| score | Similarity score terhadap produk utama |

---

# Wishlist API

Base URL:

```text
/api/wishlist
```

---

## Add Wishlist

### Endpoint

```http
POST /api/wishlist
```

### Request Body

```json
{
  "user_id": 1,
  "product_id": "10823432018"
}
```

### Success Response

```json
{
  "message": "Wishlist berhasil ditambahkan"
}
```

---

## Get Wishlist

### Endpoint

```http
GET /api/wishlist/:userId
```

### Example

```http
GET /api/wishlist/1
```

### Response

```json
[
  {
    "id": 1,
    "user_id": 1,
    "product_id": "10823432018",
    "created_at": "2026-06-11T05:30:00.000Z"
  }
]
```

---

# Cart API

Base URL:

```text
/api/cart
```

---

## Add Product to Cart

### Endpoint

```http
POST /api/cart
```

### Request Body

```json
{
  "user_id": 1,
  "product_id": "10823432018",
  "qty": 1
}
```

### Success Response

```json
{
  "message": "Produk masuk keranjang"
}
```

---

## Get Cart

### Endpoint

```http
GET /api/cart/:userId
```

### Example

```http
GET /api/cart/1
```

### Response

```json
[
  {
    "id": 1,
    "user_id": 1,
    "product_id": "10823432018",
    "qty": 1,
    "created_at": "2026-06-11T05:30:00.000Z"
  }
]
```

---

# Recommendation History API

Base URL:

```text
/api/history
```

---

## Save Recommendation History

### Endpoint

```http
POST /api/history
```

### Request Body

```json
{
  "user_id": 1,
  "product_id": "10823432018",
  "recommendation_type": "similar"
}
```

### Success Response

```json
{
  "message": "Riwayat tersimpan"
}
```

---

## Get Recommendation History

### Endpoint

```http
GET /api/history/:userId
```

### Example

```http
GET /api/history/1
```

### Response

```json
[
  {
    "id": 1,
    "user_id": 1,
    "product_id": "10823432018",
    "recommendation_type": "similar",
    "created_at": "2026-06-11T05:30:00.000Z"
  }
]
```

---

# Error Response

Semua endpoint menggunakan format error berikut:

```json
{
  "message": "Internal Server Error"
}
```

Status Code:

```http
500 Internal Server Error
```

---

# 🚀 Future Development

* JWT Authentication
* User Registration & Login API
* Remove Wishlist Feature
* Remove Cart Feature
* Checkout System
* Payment Gateway Integration
* Product Search API
* Recommendation Analytics Dashboard
* Pagination
* Rate Limiting
* API Documentation using Swagger

---

# 👨‍💻 Author

Developed for Furniture Recommendation System Project.

Technology Stack:

* Node.js
* Express.js
* MySQL
* FastAPI
* Machine Learning Recommendation Engine
* Tokopedia Furniture Dataset

```
```
