# Thado Robot - Fullstack Project

Dự án fullstack sử dụng ReactJS cho frontend và Django cho backend.

## Cấu trúc dự án

```
Thado_robot/
├── frontend/          # ReactJS application
├── backend/           # Django application
├── docs/             # Documentation
├── scripts/          # Utility scripts
└── README.md         # This file
```

## Cài đặt và chạy

### Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (ReactJS)
```bash
cd frontend
npm install
npm start
```

## Công nghệ sử dụng

- **Frontend**: ReactJS, TypeScript, Tailwind CSS
- **Backend**: Django, Django REST Framework, PostgreSQL
- **Database**: PostgreSQL
- **Authentication**: JWT
