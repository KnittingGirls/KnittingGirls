# Team-Info
| **(1) 과제명** | 도안을 구하기 어려운 뜨개인들을 위해 Image Segmentation(DeepLab)을 활용하여 제품 이미지에서 뜨개질 패턴 추출 및 도안을 생성하고 커뮤니티 기능을 제공하는 서비스 |
|:---  |---  |
| **(2) 팀 번호 / 팀 이름**  | 20-뜨개걸즈 |
| **(3) 팀 구성원** | 이유진 (2176279): 리더, FE 담당 / UI 설계 / FE-BE 연동 <br> 박지현 (2171016): 팀원, AI 담당 / 데이터 크롤링 및 데이터 전처리 / 모델 성능 개선 및 뜨개 도안 생성 담당 / 모델-케이션 연결 <br> 서자영 (2170045) : 팀원, BE 담당 / DB 설계 및 관리 / 데이터 전처리 & BE API 개발 / FE-BE 연동 및 최종 서버 배포			 |
| **(4) 팀 지도교수** | 윤명국 교수님 |
| **(5) 과제 분류** | 산학과제 |
| **(6) 과제 키워드** | DeepLabV3+, Image Segmentation, ~~Deep Fashion~~ *SCHP*  |
| **(7) 과제 내용 요약 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | 도안을 구하기 어려운 뜨개인들을 위해, DeepLab 모델로 구현한 Image Segmentation을 기술을 통해 제품 이미지에서 뜨개질 패턴을 추출하여 도안을 자동으로 생성하고, 이와 함께 커뮤니티 기능을 제공하는 안드로이드 어플리케이션 서비스이다. 사용자가 스웨터 이미지를 촬영하여 업로드하면, 해당 제품의 뜨개질 방식을 인식하여 도안을 자동으로 생성한 후 사용자에게 제공한다. 또한, 커뮤니티 기능을 통해 여기저기 흩어진 뜨개질 정보를 한 데 모으고 사용자끼리 의견을 공유할 수 있는 소통의 장을 마련한다. |

<br>

# Project-Summary
| 항목 | 내용 |
|:---  |---  |
| **(1) 문제 정의** | <br> 코로나 시기에 혼자 시간을 보낼 일이 많아지며, 특히 2030 여성층을 중심으로 뜨개질이 유행하기 시작하였다. 그러나, 이처럼 뜨개질을 취미로 하는 사람들(이하 뜨개인)은 다음의 여러 이유로 인해 원하는 도안을 찾는 데 어려움을 겪곤 한다. <br><br> *target customer: 만들고 싶은 제품을 찾았지만, 도안을 구할 곳이 유튜브, 인스타, 블로그 등 제각각이라 마음에 드는 도안을 찾기 어렵거나 가격 부담을 느끼며, 조언을 구할 사람을 주변에서 찾기 어려운 뜨개인* <br> <br>   *pain point* <br> 1. 기존의 기성세대 중심의 뜨개질 커뮤니티 자체가 다소 폐쇄적이며, 정보 공유를 꺼리는 문화가 있어 입문자는 원하는 도안을 구하기 어렵다. <br> 2. 유료 도안은 평균적으로 1만원대이며, 고가의 경우 10만원대를 웃돌기에 비용적 부담이 존재한다. <br> 3. 인터넷에서 무료 도안을 찾더라도, 대부분은 시각적 설명 없이 텍스트 형식에 영어로 작성되어 있어 초보자가 이해하기 어렵다. <br> 4. 같은 뜨개질 기법도 표기 방식이나 기호가 제각각이라 혼동하기 쉽다. 또한, 초보자의 경우 실수한 부분을 스스로 알아내기 어렵다. 따라서 누군가에게 자문을 구하고 싶으나, 뜨개질을 취미로 하는 지인을 주변에게 찾기 어렵다. <br> <br> 
| **(2) 기존연구와의 비교** |  <br> *1. chart minder* <br> <br> <img src="https://github.com/user-attachments/assets/fc83a7e2-aa8f-4edc-96d1-cff775399b92" width="auto" height="300"> <img src="https://github.com/user-attachments/assets/d0eeee76-7d89-4840-ace4-b85544662dae" width="auto" height="300"> <br> <br> 그리드 도안을 직접 색칠하여 뜨개질 도안을 만드는 서비스 <br> 장점: UI가 직관적이고, 사용법이 쉽다. ‘knitting mode’로 전환하면 진행 상황을 한 줄씩 보여줘서 몇번째 줄을 떠야 하는지 헷갈리지 않게 도와준다. <br> 단점: 스웨터, 조끼 등의 전체 형태를 뜨는 것이 아니라, 무늬만 만드는 도안이므로 이 서비스만으로는 완전한 제품을 만들 수 없다. 평평한 면에 모양만 색으로 그리는 것일 뿐, 뜨개질 기법을 표기할 수 없다. 사용자가 직접 그려야 한다. <br>  본 과제의 장점: ~~패턴(무늬)와 뜨개질 기법을 동시에 인식할 수 있다.~~ *뜨개질 기법을 인식할 수 있다.* ‘면’이 아니라 제품 전체의 도안을 전면, 측면, 후면으로 나누어 모두 제공하므로, 온전한 형태의 완제품을 만들 수 있다. AI 모델이 자동으로 도안을 생성해 주기 때문에, 편리성을 갖춘다. <br><br> 2. *knitPro* <br><br> <img src="https://github.com/user-attachments/assets/2ce8b647-0761-4266-af2d-f9be8cfa83d6" width="auto" height="200"> <img src="https://github.com/user-attachments/assets/b6bfa112-5675-465a-984c-5011ae8f4cdb" width="auto" height="200"> <br> <br> 이미지를 업로드하면 자동으로 그리드 도안을 출력해 주는 서비스이다. <br>  장점: chart minder와 비슷하지만, 사용자가 도안을 직접 그릴 필요 없이 서비스에서 자동으로 만들어 준다.<br>단점: 뜨개질 기법을 인식할 수 없으며, char minder와 동일하게 단순히 무늬 도안만 제공할 뿐 완제품을 만들 수는 없다. <br> 본 과제의 장점: ~~패턴(무늬)와 뜨개질 기법을 동시에 인식할 수 있다.~~ *뜨개질 기법을 인식할 수 있다.* ‘면’이 아니라 제품 전체의 도안을 전면, 측면, 후면으로 나누어 모두 제공하므로, 온전한 형태의 완제품을 만들 수 있다. <br> <br> 3. *ink scape* <br> <br> <img src="https://github.com/user-attachments/assets/62118d65-2c77-4814-9442-0d3ab5c824cb" width="auto" height="300"> <br><br> Adobe Illustrator와 같은 벡터 에디터의 일종으로, 옷 형태 위에 도안을 그릴 수 있다. <br> 장점: chart minder나 kint pro처럼 한 패턴이나 무늬만 그리는 것이 아니라, 전체 옷 형태를 그리고 디자인할 수 있다. 사용자의 체형에 맞게 사이즈를 조절할 수 있다.<br>  단점: 뜨개질 도안 생성용이 아니라 단순 ‘디자인’ 용도이므로, 평면 그리드 도안을 출력할 수 없다. (화면상의 격자는 가로세로 비율 용도이다.) 겨드랑이, 목선 등의 굴곡면이나 측면을 볼 수 없다. 뜨개질 기법 또한 인식할 수 없다. 사용자가 직접 그려야 한다. <br> 본 과제의 장점: 제품 전체의 도안을 전면, 측면, 후면으로 나누어 모두 제공하므로, 온전한 형태의 완제품을 만들 수 있다. AI 모델이 자동으로 도안을 생성해 주기 때문에, 편리성을 갖춘다. <br> |
| **(3) 제안 내용** | 1. AI 모델을 활용한 자동 뜨개질 도안 생성 서비스: AI 모델이 완제품 이미지에서 뜨개질 기법~~과 무늬를~~*을* 인식하여 자동으로 맞춤형 시각적 도안을 생성하고, 이를 뜨개질 초보자 및 텍스트 도안이 어려운 뜨개인들에게 무료로 제공하여 비용의 부담을 줄인다. 이미지 도안의 각 뜨개질 기법은 오직 하나의 심볼로 상징화하여 누구나 혼동 없이, 알아보기 쉽게 표현하고, 부연 설명 또한 완전히 한국어로 작성하여 기존 영문 서비스의 불편함을 해소한다. <br> 2. 뜨개질 커뮤니티: 분산된 정보와 질문을 한 데 모아 뜨개인들의 더 나은 ‘뜨개생활’의 토대를 마련한다. 동시에, 앱 내 광고 등을 통해 경제적 이익을 창출하여 서비스 작동에 필요한 자금(서버 유지비 등)을 마련하는 데 일조한다.  <br> |
| **(4) 기대효과 및 의의** | 다양한 무료 도안과 사용자 맞춤형 시각적 도안을 통해 뜨개질에 대한 진입장벽을 낮추고, 모든 뜨개인들에게 편리성을 제공하는 동시에 경제적 부담 또한 덜어 줄 수 있다. 또한, 분산된 정보가 한 데 모이고 의견을 공유할 수 있는 커뮤니티 기능을 완전한 한국어 서비스로 제공함으로써 접근성을 높이고, 앱 내 광고 등을 통해 경제적 이익 창출 및 사업 확장성 또한 기대할 수 있다. <br> |
| **(5) 주요 기능 리스트 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**| Image Segmentation: 뜨개질 기법들을 각각의 클래스로 지정한 뒤, 이미지 분류 모델(DeepLabV3)로 각 뜨개질 기법을 분류한다. <br> OpenCV: Image segmentation으로 분류된 라벨을 시각적으로 변환하여 유저에게 제공할 그리드 형태의 최종 도안을 생성한다. <br> ~~Deep Fashion: 완제품 이미지에서 구겨지거나 가려진 부분, 접힌 부분 등을 인식하여 2D 평면 형태로 보정한다.~~ <br> *SCHP: 도안을 몸통/윗소매/아랫소매 등의 부위별로 분리한다.* <br> 사용자 관리(회원가입, 로그인 등): 카카오 로그인 API를 사용하여 편리하게 관리한다. <br> 커뮤니티: 게시물 CRUD 및 댓글로 사용자끼리 의견을 공유하거나 자신의 작품을 자랑하고, 해시태그 검색, 좋아요, 북마크 기능을 통해 정보를 찾고 저장한다. <br>|

<br>
 
# Project-Design & Implementation
| 항목 | 내용 |
|:---  |---  |
| **(1) 요구사항 정의** | [1. 유스케이스 다이어그램](#유스케이스-다이어그램) <br> [2. 클래스 다이어그램 & 명세서](#클래스-다이어그램-명세서) <br> [3. UI 분석/설계 모델](#UI-분석-설계-모델) <br> [4. E-R 다이어그램](#E-R-다이어그램) |
| **(2) 전체 시스템 구성** | [(2) 전체 시스템 구성](#2-전체-시스템-구성) |
| **(3) 주요엔진 및 기능 설계** | [(3) 주요엔진 및 기능 설계](#3-주요엔진-및-기능-설계) |
| **(4) 주요 기능의 구현 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | [(4) 주요 기능의 구현](#4-주요-기능의-구현) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |

## (1) 요구사항 정의
### 유스케이스 다이어그램
 ![image (5)](https://github.com/user-attachments/assets/3d0fb582-a004-4b5c-8e4a-686985e61a9b)
 
### 클래스 다이어그램-명세서
![111](https://github.com/user-attachments/assets/75fe941a-326a-4790-a2af-b648f7ce8485)
*이미지 수정*
- 클래스/모듈 명세서
<pre><code>    
      1. User
      - 사용자 정보를 저장하는 클래스
      - 속성:
          - id: (int) 고유 사용자 ID
          - username: (string) 사용자 이름
          - email: (string) 이메일 주소
          - created_at: (datetime) 계정 생성 날짜
      - 관계:
          - 여러 개의 Post를 작성할 수 있음 (1:N)
          - 여러 개의 Comment를 작성할 수 있음 (1:N)
          - 여러 개의 Bookmark를 가질 수 있음 (1:N)
          - 여러 개의 Like를 가질 수 있음 (N:M)
          - 여러 개의 Image를 업로드할 수 있음 (1:N)
      
      2. Post
      
      - 커뮤니티에서 작성된 게시글 정보를 저장하는 클래스
      - 속성:
          - id: (int) 고유 게시글 ID
          - title: (string) 게시글 제목
          - content: (string) 게시글 내용
          - created_at: (datetime) 게시글 작성 날짜
          - user_id: (int) 작성자 ID
      - 관계:
          - 여러 개의 Comment를 가질 수 있음 (1:N)
          - 여러 개의 Bookmark를 가질 수 있음 (1:N)
          - 여러 개의 Like를 받을 수 있음 (N:M)
          - 여러 개의 PostImage를 포함할 수 있음 (1:N)
          - 여러 개의 PostHashtag를 가질 수 있음 (1:N)
      
      3. Comment
      
      - 게시글에 작성된 댓글 정보를 저장하는 클래스
      - 속성:
          - id: (int) 고유 댓글 ID
          - content: (string) 댓글 내용
          - created_at: (datetime) 댓글 작성 날짜
          - user_id: (int) 작성자 ID
          - post_id: (int) 게시글 ID
      
      4. Bookmark
      
      - 사용자가 게시글을 북마크한 정보를 저장하는 클래스
      - 속성:
          - id: (int) 고유 북마크 ID
          - user_id: (int) 북마크한 사용자 ID
          - post_id: (int) 북마크된 게시글 ID
      
      5. Like
      
      - 사용자가 게시글에 좋아요를 누른 정보를 저장하는 클래스
      - 속성:
          - id: (int) 고유 좋아요 ID
          - user_id: (int) 좋아요를 누른 사용자 ID
          - post_id: (int) 좋아요를 받은 게시글 ID
      
      6. Image
      
      - 게시글에 포함된 이미지를 저장하는 클래스
      - 속성:
          - id: (int) 고유 이미지 ID
          - image_name: (string) 이미지 파일명
          - image_data: (binary) 이미지 데이터
          - upload_date: (datetime) 업로드 시간
          - post_id: (int) 관련 게시글 ID
      
      7. Hashtag
      
      - 게시글에 지정된 해시태그 정보를 저장하는 클래스
      - 속성:
          - post_id: (int) 게시글 ID
          - hashtag: (string) 해시태그 내용
      
      9. Input Image
      
      - 설명: 도안 생성 시 사용자가 업로드한 이미지를 저장하는 클래스
      - 관계:
          - DeepLab_Model, OpenCV_Processor, <del>DeepFashion_Model</del><i>SCHP(Self-Correction-Human-Parsing)_Model</i>이 이 이미지를 처리함
      
      10. DeepLab Model
      
      - image segmentation 수행 모델
      - 메서드:
          - segment_image(): 뜨개질 기법 클래스 인식 수행
      
      11. OpenCV_Processor
      
      - OpenCV를 사용해 이미지 후처리 및 도안 생성하는 클래스
      - 메서드:
          - process_image(): 이미지 처리 수행
      
      <i>12. SCHP(Self-Correction-Human-Parsing)_Model
      
      - 도안을 몸통/소매 등 파트별로 분리</i>
      - 메서드:
          - refine_image(): 파트별 도안 분리 수행
      
      13. Pattern
      
      - 최종 생성된 도안
      - 관계:
          - DeepLab_Model, OpenCV_Processor, <del>DeepFashion_Model</del> <i>SCHP(Self-Correction-Human-Parsing)_Model</i>이 이 도안을 생성함
          - User가 최종적으로 다운로드함
 </code></pre>
### UI 분석-설계 모델 
 ![Group 3](https://github.com/user-attachments/assets/7b70db36-1f24-4bec-afec-79c1e84b6999)

      <주요 기능>
      1. 도안 생성 기능
        - 도안 생성 과정 안내 페이지→ 이미지 업로드 페이지(도안 만들 스웨터 이미지 업로드) → 도안 확인 및 저장 페이지
      2. 커뮤니티 기능
        - 게시물 전체 조회 페이지 → 게시물 작성 페이지/ 각 게시물 조회 페이지/스크랩한 글 페이지
        - 사이드바로 접근 → 내가 쓴 글 페이지/스크랩한 글 페이지
 
### E-R 다이어그램 
  ![image (7)](https://github.com/user-attachments/assets/52f3c70d-7977-4e3b-ada6-6ada1cb64b7a)
  
## (2) 전체 시스템 구성 ##
![KakaoTalk_20250505_225858177](https://github.com/user-attachments/assets/b3020fcf-9619-4cc6-afab-558fe42dff91) <br>
<pre><code>
     FE (Frontend): React Native v.0.75, Node.js, Expo
     BE (Backend): Spring Boot 3.1.0, Spring Security 6.1.0, Spring Data JPA
       - DB: MySQL 8.0.40
       - 회원가입 및 로그인: JWT 0.11.2, Kakao login REST API
       - BE-AI 연동: FastAPI
     AI: DeepLabV3+, OpenCV, <del>DeepFashion</del> <i>SCHP(Self-Correction-Human-Parsing)</i>
</code></pre>

## (3) 주요엔진 및 기능 설계 ##
<pre>
    1. DeepLabV3+           
    [DeepLabV3+](https://pytorch.org/hub/pytorch_vision_deeplabv3_resnet101/) - 총 5가지 주요 뜨개질 기법(single jersey, rib, purl, ajour, moss)을 각각의 클래스로 지정한 뒤, 라벨링 및 전처리 과정을 거친 약 1만개의 데이터를 DeepLabV3 모델에 학습시켜 image segmentation 기술을 구현하였다. |
    
    2. OpenCV
     [OpenCV](https://opencv.org/) - Image Segmentation을 바탕으로 분류된 라벨에 따라서 각 라벨에 기호를 할당하여 그리드에 표현한다. Ast 모듈을 이용해서 문자열 형태로 저장된 텍스트 데이터를 python 객체로 변환시킨다. 이후 numpy를 이용하여 RGB 평균 계산을 하고 마지막으로 matplotlib.pyplot을 이용하여 데이터 시각화를 진행한다.
    
<code><del>    3. DeepFashion2
    [DeepFashion2](https://github.com/switchablenorms/DeepFashion2) - 사용자가 업로드한 이미지에서 배경/장애물 등과 의류를 구분한다. 인식된 의류 이미지에서 구겨지거나 가려진 부분, 접힌 부분 등을 인식한 뒤, 해당 부분에 맞는 뜨개질 기법을 생성하여 그리드 도안의 옷 틀 모양의 빈 부분을 채운다.</del></code>

<code><i>    3. SCHP (Self-Correction-Human-Parsing)
    [SCHP](https://github.com/GoGoDuck912/Self-Correction-Human-Parsing) - 도안을 몸통/윗소매/아랫소매 등의 부위별로 분리한다.</i></code>
    
    4. JWT & Kakao login API
    [Kakao login API](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api) - 커뮤니티 기능 중, 회원가입 및 로그인 등의 사용자 관리에 사용된다. 서비스의 보안을 위해 모든 사용자는 로그인 후 서비스를 이용할 수 있다. 또한, 로그인된 사용자 정보를 통해 게시글 CRUD, 검색, 좋아요, 북마크 등의 세부 커뮤니티 기능의 HTTP 요청 쿼리로 ‘사용자명’이 사용된다.
    
    5. 게시글 CRUD 및 댓글
    사용자는 자신의 작품을 게시글로 자랑하거나, 궁금한 점을 글로 작성할 수 있다. 이에 대한 의견을 댓글을 통해 나누며 소통한다.
    
    6. 좋아요 및 북마크
    각 게시글에 ‘좋아요’와 ‘북마크’를 할 수 있다. 북마크한 글은 내 프로필에서 모아 볼 수 있어, 유용한 정보나 나중에 뜨고 싶을 도안 등을 한 곳에 편리하게 저장할 수 있다.
    
    7. 해시태그 검색
    게시글을 해시태그로 검색할 수 있다. 각 게시글에 있는 해시태그로 원하는 게시물을 검색할 수 있다. 이를 통해 빠른 정보 탐색이 가능하다.
</pre>       
## (4) 주요 기능의 구현 ##

| **기능**                       | **설명**                                                                                                                                                        | **진척도 및 검증**                                                                                                                                                  | **이미지/기타** |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| **1. 이미지 업로드 <br> → 뜨개질 기법 인식<br> → ~~도안 생성~~ *그리드 도안 연결*** | 사용자가 이미지를 업로드하면, DeepLabV3 모델이 image segmentation 기술을 통해 뜨개질 기법~~과 무늬를~~*을* 인식한다. ~~DeepFashion 모델로 이미지에서 가려진 부분, 접힌 부분 등을 인식한 뒤~~ 그리드 도안의 제품 틀(shape)에 맞게 빈 공간을 채운다. 마지막으로, OpenCV로 모든 데이터를 시각적으로 출력하여 최종 도안을 생성한다. | - **DeepLab**: <br>Image Segmentation <br> IoU score *0.7*, accuracy *0.9* 달성 <br> - **OpenCV**: <br>도안 추출 테스트 완료 <br> - **FE-BE 구현 및 연동 완료**: ~~(50%)~~ *(100%)* ✅  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | ![image (8)](https://github.com/user-attachments/assets/c2430269-76f9-4e8c-b766-eef96ed3552d) ![image](https://github.com/user-attachments/assets/c08d2c17-dad5-4fac-8d3e-09255c08a961) ![image](https://github.com/user-attachments/assets/776e1af4-f0e0-4ec4-8fcc-82da956a8ea9)|
| ***2. 도안의 부위별 분리*** | *사용자가 이미지를 업로드하면, SCHP의 Pascal 데이터셋을 이용해서 옷의 몸통과 윗소매, 아랫소매 등의 스웨터의 파트별로 인식한다. 이후에 결과값을 그리드로 전달해 부위별로 분리된 bottom-up 방식의 도안을 생성하는 것까지 연결 완료하였다.* | *90% 이상 완료, SCHP의 결과값과 그리드 코드 연결 완료, 스웨터 데이터 추가 예정*  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | <img src="https://github.com/user-attachments/assets/d956bee2-bad1-4720-acef-876770e4f6ab" width="400" height="auto"/><img src="https://github.com/user-attachments/assets/7a2443e9-6c1d-4342-865c-f343488d15bb" width="400" height="auto"/>|
| **~~2~~*3*. 회원가입 및 로그인 <br> → 커뮤니티 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | 서비스를 이용하기 위해 Kakao login API를 통해 회원가입 또는 로그인을 한다. 그 후 게시글 CRUD나 댓글 등을 통해 질의응답, 정보 공유, 작품 자랑 등을 할 수 있고, 좋아요/북마크/검색 등의 세부 기능을 통해 정보 탐색 및 저장 가능. | - **FE-BE 구현 및 연동 완료**:  ~~(50%)~~ *(90%)* <br> - 커뮤니티 게시물 조회 ✅ <br> - 카카오 로그인 연동 *완료 ✅* <br> - **UI 구현 % 완료**: (80%) <br> - 전반적인 UI 구현 완료 ✅ | <img src="https://github.com/user-attachments/assets/5a3e16a0-d048-4efd-9c82-b0030ada3cd0" width="400" height="auto"/><img src="https://github.com/user-attachments/assets/c5ba9242-2e96-4ae9-a4f1-ff1081327392" width="400" height="auto"/>|

