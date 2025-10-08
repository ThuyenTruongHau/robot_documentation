# 🔧 Hướng dẫn cấu hình Environment Variables

## 📋 Bước 1: Tạo file `.env.development` (cho local development)

Tạo file `frontend/.env.development` với nội dung:

```env
# Development Environment
REACT_APP_API_URL=http://localhost:9000
REACT_APP_ENABLE_CONSOLE_LOGS=true
REACT_APP_API_TIMEOUT=10000
```

## 📋 Bước 2: Tạo file `.env.production` (cho production)

Tạo file `frontend/.env.production` với nội dung:

```env
# Production Environment
REACT_APP_API_URL=https://robot-documentation-2003.onrender.com
REACT_APP_ENABLE_CONSOLE_LOGS=false
REACT_APP_API_TIMEOUT=30000
```

## ✅ Hoàn tất!

### Test Development:
```bash
cd frontend
npm start
```

### Test Production Build:
```bash
cd frontend
npm run build
npx serve -s build
```

## 🌐 Cấu hình đã được thiết lập:

### Frontend domain:
- **Production**: https://rfid.thadorobot.com
- **Development**: http://localhost:3000

### Backend API:
- **Production**: https://robot-documentation-2003.onrender.com
- **Development**: http://localhost:9000

### CORS đã được cấu hình:
Backend sẽ chấp nhận requests từ:
- ✅ http://localhost:3000
- ✅ http://127.0.0.1:3000
- ✅ https://rfid.thadorobot.com
- ✅ http://rfid.thadorobot.com

### ALLOWED_HOSTS đã được cấu hình:
Backend sẽ phục vụ từ các domain:
- ✅ localhost
- ✅ 127.0.0.1
- ✅ robot-documentation-2003.onrender.com
- ✅ rfid.thadorobot.com
- ✅ www.rfid.thadorobot.com

## ⚠️ Lưu ý quan trọng:

1. **KHÔNG commit** file `.env.development` và `.env.production` vào Git nếu có sensitive data
2. URL **KHÔNG có** dấu `/` ở cuối
3. URL **KHÔNG có** `/api` ở cuối (code tự động thêm)
4. Các biến phải bắt đầu bằng `REACT_APP_` để React nhận diện

## 🚀 Deploy lên Production:

Khi deploy lên platform (Vercel/Netlify/Render), thêm environment variables sau:

```
REACT_APP_API_URL=https://robot-documentation-2003.onrender.com
REACT_APP_ENABLE_CONSOLE_LOGS=false
REACT_APP_API_TIMEOUT=30000
```

