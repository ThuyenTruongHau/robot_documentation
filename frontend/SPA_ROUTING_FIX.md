# SPA Routing Fix - Deployment Guide

## Vấn đề
Khi reload trang ở các route như `/rfid-products`, `/about-us` trên production, server trả về 404 vì không tìm thấy file tương ứng.

## Nguyên nhân
- React Router xử lý routing ở client-side
- Server không biết về các routes của frontend
- Cần fallback để redirect về `index.html`

## Giải pháp

### 1. Apache Server (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### 2. Nginx Server
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 3. Netlify (_redirects file)
```
/*    /index.html   200
```

### 4. Vercel (vercel.json)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 5. GitHub Pages (404.html)
```html
<script>
  sessionStorage.redirect = location.href;
</script>
<meta http-equiv="refresh" content="0;URL='/index.html'">
```

## Cấu hình cho Thado RFID

### Frontend (React)
1. **package.json**: Đã cập nhật `homepage: "https://rfid.thadorobot.com"`
2. **.htaccess**: Đã tạo trong `frontend/public/.htaccess`
3. **nginx.conf**: Đã tạo trong `frontend/nginx.conf`

### Backend (Django)
1. **Catch-all route**: Đã thêm `<path:path>` để handle unknown routes
2. **CORS settings**: Đã cấu hình cho production domains

## Deployment Steps

### 1. Build Frontend
```bash
cd frontend
npm run build
```

### 2. Deploy Files
- Upload `build/` folder contents to web server
- Include `.htaccess` file (for Apache)
- Configure nginx with provided config (for Nginx)

### 3. Test Routes
- Visit `https://rfid.thadorobot.com/rfid-products`
- Reload page - should work without 404
- Test all menu routes

## Server Configuration Examples

### Apache Virtual Host
```apache
<VirtualHost *:443>
    ServerName rfid.thadorobot.com
    DocumentRoot /var/www/thado-rfid-frontend/build
    
    # SSL configuration
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Enable .htaccess
    AllowOverride All
    
    # Security headers
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
</VirtualHost>
```

### Nginx Server Block
```nginx
server {
    listen 443 ssl http2;
    server_name rfid.thadorobot.com;
    
    root /var/www/thado-rfid-frontend/build;
    index index.html;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
}
```

## Testing Checklist

- [ ] Home page loads correctly
- [ ] All menu routes work on first visit
- [ ] All menu routes work after page reload
- [ ] Direct URL access works (e.g., `/rfid-products`)
- [ ] Browser back/forward buttons work
- [ ] SEO meta tags work correctly
- [ ] Health check endpoints work

## Troubleshooting

### Still getting 404?
1. Check if `.htaccess` is uploaded correctly
2. Verify nginx configuration is applied
3. Check server error logs
4. Test with curl: `curl -I https://rfid.thadorobot.com/rfid-products`

### Routes not working?
1. Check `homepage` in package.json
2. Verify build output includes correct paths
3. Check browser console for errors
4. Verify React Router configuration

## Security Notes

- Only allow necessary origins in CORS
- Use HTTPS in production
- Set proper security headers
- Monitor server logs for suspicious activity
