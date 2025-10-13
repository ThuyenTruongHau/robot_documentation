#!/bin/bash
# =========================================
# Script deploy frontend/build -> branch deploy
# =========================================

set -e  # Dừng script nếu có lỗi

# Tên nhánh chính và nhánh deploy
MAIN_BRANCH="main"
DEPLOY_BRANCH="deploy_new"
BUILD_PATH="frontend/build"

# 1️⃣ Kiểm tra và lưu các thay đổi hiện tại
echo "💾 Kiểm tra và lưu thay đổi hiện tại..."
if [[ -n $(git status -s) ]]; then
    echo "⚠️  Có thay đổi chưa commit, đang stash..."
    git stash
    STASHED=true
else
    STASHED=false
fi

# 2️⃣ Đảm bảo đang ở nhánh main
git checkout $MAIN_BRANCH

# 3️⃣ Build project
echo "🏗️  Đang chạy build..."
cd frontend
npm run build
cd ..

# 4️⃣ Kiểm tra và tạo nhánh deploy nếu chưa có
if ! git show-ref --verify --quiet refs/heads/$DEPLOY_BRANCH; then
    echo "🌿 Tạo nhánh mới $DEPLOY_BRANCH..."
    git checkout -b $DEPLOY_BRANCH
else
    echo "🌿 Chuyển sang nhánh $DEPLOY_BRANCH..."
    git checkout $DEPLOY_BRANCH
fi

# 5️⃣ Lấy thư mục build từ main
echo "📦 Lấy thư mục $BUILD_PATH từ nhánh $MAIN_BRANCH..."
git checkout $MAIN_BRANCH -- $BUILD_PATH

# 6️⃣ Commit và push
echo "💾 Commit và đẩy lên remote..."
git add $BUILD_PATH
git commit -m "Deploy latest build from $MAIN_BRANCH on $(date '+%Y-%m-%d %H:%M:%S')"
git push origin $DEPLOY_BRANCH

# 7️⃣ Quay lại main
git checkout $MAIN_BRANCH

# 8️⃣ Khôi phục các thay đổi đã stash
if [ "$STASHED" = true ]; then
    echo "📂 Khôi phục các thay đổi đã stash..."
    git stash pop
fi

echo ""
echo "✅ Deploy thành công lên nhánh '$DEPLOY_BRANCH'!"