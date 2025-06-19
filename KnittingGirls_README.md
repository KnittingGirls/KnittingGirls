# 🧶 KnittingGirls

> **팀**: 20. 뜨개걸즈  
> **팀원**  
> - FE: 이유진 (2176279) [@YJin33](https://github.com/YJin33)  
> - BE: 서자영 (2170045) [@xeoxaxeo](https://github.com/xeoxaxeo)  
> - AI: 박지현 (2171016) [@jihyeun-park](https://github.com/jihyeun-park)  

> **📥 최종 APK 다운로드**  
> 👉 [FrontEnd Release APK](https://drive.google.com/drive/folders/1HJ693vNUebx3s9e7kfsIXctsZxBzqi4e?hl=ko)  

KnittingGirls는 뜨개질 제품 사진을 AI 모델로 분석해 자동 도안 PDF를 생성하고, 커뮤니티 기능을 제공하는 올인원 플랫폼입니다.  
세 개의 독립 모듈(AI · BackEnd · FrontEnd)을 서브모듈로 포함하며, 각 파트를 분리된 레포지토리에서 개발·배포합니다.

---

## 📑 목차

1. [프로젝트 개요](#프로젝트-개요)  
2. [레포지토리 구조](#레포지토리-구조)  
3. [설치 및 빌드](#설치-및-빌드)  
   - [1) 메인 레포 클론 (서브모듈 포함)](#1-메인-레포-클론-서브모듈-포함)  
   - [2) BackEnd 서버](#2-backend-서버)  
   - [3) FrontEnd 앱 (Android)](#3-frontend-앱-android)  
   - [4) AI 모델 학습·평가](#4-ai-모델-학습평가)  
4. [테스트 방법](#테스트-방법)  
5. [샘플 데이터](#샘플-데이터)  
6. [데이터베이스](#데이터베이스)  
7. [오픈소스 및 라이선스](#오픈소스-및-라이선스)  

---

## 🚀 프로젝트 개요

- **목표**  
  1. 이미지 세그멘테이션 기반 뜨개 기법·신체 부위 인식  
  2. 3×3 심볼 타일 PDF 도안 자동 생성  
  3. 게시글·댓글·북마크·좋아요 등 커뮤니티 기능  
  4. React-Native Android 앱 배포  

- **모듈 구성**  
  - **AI**: DeepLabV3+·SCHP 모델 학습·평가 노트북  
  - **BackEnd**: Spring Boot REST API & FastAPI ML 서버  
  - **FrontEnd**: React-Native Android 앱  

---

## 📂 레포지토리 구조

```
KnittingGirls/                     ← 메인 레포지토리
├─ README.md                       ← 프로젝트 설명 (이 파일)
├─ .gitmodules                     ← 서브모듈 정의
├─ AI/           (submodule)       ← 모델 학습·평가 노트북
├─ BackEnd/      (submodule)       ← Spring Boot + FastAPI 서버
└─ FrontEnd/     (submodule)       ← Android 앱 (Expo)
```

---

## ⚙️ 설치 및 빌드

### 1) 메인 레포 클론 (서브모듈 포함)
```bash
git clone --recurse-submodules git@github.com:KnittingGirls/KnittingGirls.git
cd KnittingGirls
```

### 2) BackEnd 서버
```bash
cd BackEnd

# 1. 환경 설정
cp src/main/resources/application.properties.sample src/main/resources/application.properties
# • MySQL JDBC URL, 사용자/비밀번호 설정
# • JWT 시크릿·토큰 만료 시간 설정
# • CORS 허용 도메인 설정

# 2. 빌드 & 실행 (Java 17+)
./mvnw clean package
java -jar target/knitting-girls-0.0.1-SNAPSHOT.jar

# 3. ML 서버 (별도 터미널)
cd ml_server
source venv/bin/activate
uvicorn final_model_server:app --host 0.0.0.0 --port 8000 --reload
```
- **BackEnd API**: `http://<서버_IP>:8080`  
- **ML 서버**: `http://<서버_IP>:8000`  

### 3) FrontEnd 앱 (Android)
```bash
cd FrontEnd

# 1. 패키지 설치
npm install

# 2. 환경 변수 설정
echo "EXPO_PUBLIC_IPHOST=<서버_IP>" > .env
echo "EXPO_POST_BASE_URL=http://<서버_IP>:8080/posts" >> .env

# 3. APK 빌드
## (1) Expo prebuild & Android Studio 방식
npm expo prebuild
npx expo run:android --variant release

## (2) Gradle 직접 빌드
cd android
./gradlew assembleRelease

# 결과물: android/app/build/outputs/apk/release/app-release.apk
```
- APK 설치 후, 기기에서 실행하세요.

### 4) AI 모델 학습·평가
```bash
cd AI

# 1. 가상환경 준비 (venv 또는 conda)
pip install -r requirements.txt

# 2. Jupyter Lab 실행
jupyter lab

# 노트북 실행 순서
- DeepLabV3+ 학습 (EPOCH 80, IOU: 0.72)
- SCHP 학습 (Pixel Accuracy: 0.8589, Mean IOU: 0.6881)
- Grid PDF 생성 (symbol_patterns → matplotlib)
```

---

## ✅ 테스트 방법

1. **API 테스트** (curl / Postman)
   ```bash
   # 게시글 목록 조회
   curl http://<서버_IP>:8080/posts

   # 도안 생성 요청
   curl -X POST http://<서버_IP>:8000/predict -F file=@./sample.jpg

   # 생성된 PDF 다운로드
   curl http://<서버_IP>:8000/pdfs/{filename}.pdf
   ```

2. **앱 기능 확인**
   1. APK 설치 후 로그인
   2. 도안 생성 → 커뮤니티 사용
   3. 내 게시글 / 좋아요 / 북마크 확인

3. **모델 성능**
   - DeepLabV3+ IOU: 0.72  
   - SCHP Pixel Accuracy: 0.8589, Mean IOU: 0.6881  

---

## 📊 샘플 데이터

- **AI/data/**: 학습·검증용 이미지 및 라벨
- **BackEnd/backend/db/**: MySQL 덤프 스크립트 (`*.sql`)
- **FrontEnd/sample/**: 테스트용 스크린샷 및 APK 링크

---

## 🗄️ 데이터베이스

- **MySQL 8.0+**
- **스키마 테이블**:
  `users`, `posts`, `post_hashtags`, `post_image`, `post_likes`, `comments`, `images`, `bookmarks`
- **덤프 파일** (BackEnd/backend/db):
  - knitting_girls_users.sql  
  - knitting_girls_posts.sql  
  - knitting_girls_post_hashtags.sql  
  - knitting_girls_post_image.sql  
  - knitting_girls_post_likes.sql  
  - knitting_girls_comments.sql  
  - knitting_girls_images.sql  
  - knitting_girls_bookmarks.sql

```sql
CREATE DATABASE IF NOT EXISTS knitting_girls;
USE knitting_girls;
/* 각 테이블 DDL 및 INDEX 정의 */
```

---

## 📦 오픈소스 및 라이선스

- **DeepLabV3+** (MIT) – 이미지 세그멘테이션
- **SCHP** (Apache-2.0) – Human Parsing
- **Spring Boot** (Apache-2.0) – 백엔드 API
- **FastAPI** (MIT) – ML 서버
- **React-Native / Expo** (MIT) – 모바일 앱
- **Python 3.8+**, **Java 17+**, **JavaScript**
