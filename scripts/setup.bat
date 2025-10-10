@echo off
echo 🚀 Setting up Thado Robot Fullstack Project...

REM Create virtual environment for backend
echo 📦 Setting up Django backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt

REM Create .env file from template
if not exist .env (
    copy env.template .env
    echo ⚠️  .env file created from template
)

REM Run Django migrations
python manage.py makemigrations
python manage.py migrate

REM Create superuser
echo 👤 Creating superuser...
python manage.py createsuperuser

cd ..

REM Setup frontend
echo ⚛️  Setting up React frontend...
cd frontend
npm install

echo ✅ Setup complete!
echo.
echo To run the project:
echo Backend: cd backend ^&^& venv\Scripts\activate ^&^& python manage.py runserver
echo Frontend: cd frontend ^&^& npm start
echo.
echo Don't forget to:
echo 1. Update backend/.env with your database credentials
echo 2. Install PostgreSQL if you haven't already
echo 3. Create a database named 'thado_robot'
pause
