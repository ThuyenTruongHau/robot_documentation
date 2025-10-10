@echo off
echo Building frontend...
cd frontend
npm run build
cd ..

echo Switching to deploy branch...
git checkout deploy
git rm -rf .

echo Copying build from main...
git --work-tree=frontend/build checkout main -- .

echo Committing and pushing...
git add .
git commit -m "Deploy new build"
git push origin deploy --force

echo Switching back to main...
git checkout main

echo Done!
pause
