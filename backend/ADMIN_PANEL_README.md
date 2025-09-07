# Trang Quản Trị Thado Robot

## Tổng quan

Trang quản trị được tạo để quản lý Categories và Products một cách dễ dàng thông qua giao diện web thân thiện.

## Truy cập

- **URL**: `http://localhost:8000/manage/`
- **Yêu cầu**: Phải đăng nhập với tài khoản Django admin

## Tính năng chính

### 1. Dashboard (`/manage/`)
- Tổng quan thống kê: số lượng categories, products
- Danh sách categories và products gần đây
- Quick actions để tạo mới nhanh

### 2. Quản lý Categories (`/manage/categories/`)

#### Danh sách Categories
- Hiển thị tất cả categories với phân trang (10 items/page)
- Tìm kiếm theo tên hoặc mô tả
- Thống kê số products trong mỗi category
- Actions: Xem chi tiết, Chỉnh sửa, Xóa

#### Tạo Category Mới (`/manage/categories/create/`)
- Form nhập tên category (bắt buộc)
- Upload hình ảnh (tùy chọn)
- Nhập mô tả (tùy chọn)
- Preview hình ảnh trước khi lưu

#### Chi tiết Category (`/manage/categories/{id}/`)
- Hiển thị đầy đủ thông tin category
- Danh sách tất cả products thuộc category
- Quick actions để chỉnh sửa hoặc xóa
- Thống kê số products

#### Chỉnh sửa Category (`/manage/categories/{id}/edit/`)
- Form chỉnh sửa tương tự form tạo mới
- Hiển thị hình ảnh hiện tại
- Có thể thay đổi hình ảnh hoặc giữ nguyên

#### Xóa Category (`/manage/categories/{id}/delete/`)
- Xác nhận trước khi xóa
- Cảnh báo về việc xóa tất cả products trong category
- Hiển thị thông tin sẽ bị xóa

### 3. Quản lý Products (`/manage/products/`)

#### Danh sách Products
- Hiển thị tất cả products với phân trang (10 items/page)
- Tìm kiếm theo tên hoặc mô tả
- Lọc theo category
- Hiển thị hình ảnh đầu tiên của product
- Actions: Xem chi tiết, Chỉnh sửa, Xóa

#### Tạo Product Mới (`/manage/products/create/`)
- Form nhập tên product (bắt buộc)
- Chọn category (bắt buộc)
- Nhập mô tả (tùy chọn)
- Nhập thông số kỹ thuật dạng JSON (tùy chọn)
- Validation JSON format

#### Chi tiết Product (`/manage/products/{id}/`)
- Hiển thị đầy đủ thông tin product
- Hiển thị tất cả hình ảnh của product
- Quick actions để chỉnh sửa, thêm hình ảnh, xóa
- Thống kê số hình ảnh

#### Chỉnh sửa Product (`/manage/products/{id}/edit/`)
- Form chỉnh sửa tương tự form tạo mới
- Validation JSON cho thông số kỹ thuật
- Hướng dẫn format JSON

#### Xóa Product (`/manage/products/{id}/delete/`)
- Xác nhận trước khi xóa
- Cảnh báo về việc xóa tất cả hình ảnh
- Hiển thị thông tin sẽ bị xóa

#### Quản lý Hình Ảnh
- **Thêm hình ảnh** (`/manage/products/{id}/images/add/`)
  - Upload hình ảnh mới
  - Validation file size (max 10MB)
  - Validation file type (JPG, PNG, GIF)
  - Preview hình ảnh trước khi upload
  - Hiển thị hình ảnh hiện tại

- **Xóa hình ảnh** (`/manage/images/{id}/delete/`)
  - Xác nhận trước khi xóa
  - Hiển thị hình ảnh sẽ bị xóa

## Giao diện

### Thiết kế
- Sử dụng Bootstrap 5.3.0
- Font Awesome icons
- Responsive design
- Sidebar navigation
- Card-based layout

### Màu sắc
- Primary: Blue (#2563eb)
- Success: Green
- Warning: Orange
- Danger: Red
- Info: Light Blue

### Tính năng UI/UX
- Loading states cho buttons
- Success/Error messages
- Confirmation dialogs
- Image previews
- Pagination
- Search và filter
- Responsive tables

## Bảo mật

- Tất cả views yêu cầu đăng nhập (`@login_required`)
- CSRF protection cho tất cả forms
- File upload validation
- Input validation và sanitization

## Cấu trúc Files

```
backend/
├── templates/admin/
│   ├── base.html                    # Template cơ sở
│   ├── dashboard.html               # Trang chủ
│   ├── category_list.html          # Danh sách categories
│   ├── category_form.html          # Form tạo/sửa category
│   ├── category_detail.html        # Chi tiết category
│   ├── category_confirm_delete.html # Xác nhận xóa category
│   ├── product_list.html           # Danh sách products
│   ├── product_form.html           # Form tạo/sửa product
│   ├── product_detail.html         # Chi tiết product
│   ├── product_confirm_delete.html # Xác nhận xóa product
│   ├── product_image_form.html     # Form thêm hình ảnh
│   └── product_image_confirm_delete.html # Xác nhận xóa hình ảnh
├── apps/category/
│   ├── admin_views.py               # Views quản trị categories
│   ├── admin_urls.py               # URLs quản trị categories
│   └── forms.py                    # Forms cho categories
└── apps/product/
    ├── admin_views.py               # Views quản trị products
    ├── admin_urls.py                # URLs quản trị products
    └── forms.py                     # Forms cho products
```

## Hướng dẫn sử dụng

### 1. Truy cập trang quản trị
1. Đăng nhập Django admin: `http://localhost:8000/admin/`
2. Truy cập trang quản trị: `http://localhost:8000/manage/`

### 2. Quản lý Categories
1. Vào **Categories** từ sidebar
2. **Tạo mới**: Click "Tạo Category Mới"
3. **Chỉnh sửa**: Click icon edit trong danh sách
4. **Xóa**: Click icon delete và xác nhận

### 3. Quản lý Products
1. Vào **Products** từ sidebar
2. **Tạo mới**: Click "Tạo Product Mới"
3. **Thêm hình ảnh**: Vào chi tiết product → "Thêm Hình Ảnh"
4. **Chỉnh sửa**: Click icon edit trong danh sách
5. **Xóa**: Click icon delete và xác nhận

### 4. Tìm kiếm và Lọc
- Sử dụng ô tìm kiếm ở đầu mỗi trang
- Lọc products theo category
- Phân trang tự động

## Lưu ý

- Tất cả hình ảnh được lưu trong thư mục `media/`
- JSON parameters phải đúng format
- File upload giới hạn 10MB
- Chỉ hỗ trợ định dạng hình ảnh: JPG, PNG, GIF
- Xóa category sẽ xóa tất cả products trong category đó
- Xóa product sẽ xóa tất cả hình ảnh của product đó
