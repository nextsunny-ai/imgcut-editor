# 써니에디터 / SUNNY EDITOR

**v1.1** · 2026-05-26 · [sunnyeditor.com](https://sunnyeditor.com)

완성된 HTML 페이지의 이미지·텍스트를 코드 한 줄 건드리지 않고 한 번에 편집합니다.
Edit images and text in a finished HTML page — no code.

설치 X · 회원가입 X · 서버 X. 모든 처리는 브라우저 안에서만.
No install. No signup. No server. Everything runs in your browser.

---

## 3가지 모드 / Three modes

| 모드 | 무엇 | 언제 |
|---|---|---|
| **HTML** | 단일 HTML 파일 1개 | 모든 CSS·이미지가 HTML 안에 인라인된 경우 |
| **ZIP** | 사이트 폴더를 ZIP으로 묶어서 | 외부 CSS·이미지 폴더·여러 HTML 페이지가 분리된 일반 웹사이트 |
| **폴더** | 폴더를 통째로 선택 | Chrome / Edge. ZIP과 동일하지만 압축 단계 없이 |

어떤 모드인지 모르겠으면 **ZIP**으로 가세요.

---

## 사용법 4단계 / Usage

1. **모드 선택** — 사이드바 상단의 HTML / ZIP / 폴더 탭.
2. **업로드** — 드래그앤드롭 또는 클릭. ZIP/폴더는 자동으로 메인 HTML을 찾아 엽니다.
3. **편집** — 이미지 / 텍스트 / 미리보기 탭에서 카드 단위 교체·수정·삭제.
4. **다운로드** — HTML 모드는 단일 HTML, ZIP/폴더 모드는 사이트 통째 ZIP으로 재패킹.

---

## 기능 / Features

### 코어
- HTML 안의 모든 `<img>` 자동 감지 / Auto-detect every image
- 이미지 교체 + 크롭 (자유·1:1·16:9·4:3·3:2·2:3·9:16) / Replace and crop
- 이미지 크기·컨테이너 높이 수정 / Edit dimensions
- 모든 텍스트 노드 자동 추출·일괄 편집 / Bulk text editing
- 변경/삭제/교체 이력 + 개별 취소 / Change history with per-item undo
- 변경사항 미리보기 (iframe) / Live preview
- 한국어 / 영어 다국어 (브라우저 언어 자동 감지) / Korean / English (auto-detect)

### V1.1 — 일반 웹사이트 처리
- **외부 CSS 자동 인라인** — `<link rel="stylesheet">` 따라가서 인라인 처리, 다운로드 시 원본 외부 파일로 복원
- **상대경로 이미지 실제 미리보기** — `./images/logo.png` 같은 경로의 이미지를 그대로 표시·교체
- **다중 HTML 페이지** — `index.html` + `about.html` + `contact.html` 같은 다페이지 사이트 ZIP에서 페이지 셀렉터로 전환 편집
- **사이트 ZIP 재패킹** — 편집 후 사이트 통째로 ZIP. 원본 폴더 구조·CSS·이미지·안 건드린 파일 모두 보존, 변경된 것만 교체. 그대로 호스팅 업로드 가능
- **폴더 드롭** — 폴더를 사이드바에 끌어다 놓기 (Chrome / Edge)
- **macOS 메타 파일 자동 무시** — `__MACOSX/`, `.DS_Store`, `Thumbs.db` 자동 필터

### 부가
- 팝업 배너 1클릭 삽입 (배경 클릭/ESC 키/✕ 닫기 모두 작동) / One-click popup banner
- 쿠키 동의 배너 1클릭 삽입 / One-click cookie consent
- 샘플 사이트 즉시 체험 / Try sample one click

---

## 한계 / Limitations

- **빌드된 SPA 소스코드는 X.** React/Vue/Svelte 컴포넌트 자체(`.jsx`, `.vue`)는 처리하지 않습니다. 다만 **빌드 후 결과물** (Next.js `next export`, Vite `vite build` 등으로 만든 정적 HTML)은 ZIP으로 묶으면 처리됩니다.
- 서버에서 동적으로 생성되는 페이지 (PHP·Django 템플릿 등 빌드 안 한 것)는 받은 정적 HTML만 편집됩니다.
- JS로 런타임에 생성되는 콘텐츠는 정적 HTML에 없으면 감지 안 됩니다.
- Safari·Firefox = HTML / ZIP 모드 OK. 폴더 모드(`webkitdirectory`)는 Chrome / Edge 권장.

---

## 실행 / Run

### 온라인
브라우저에서 [sunnyeditor.com](https://sunnyeditor.com) 열기.

### 오프라인
`index.html`을 다운로드하여 더블클릭하면 브라우저에서 열립니다.
인터넷 없이 작동 (첫 폰트 로딩만 필요).

### 로컬 개발
```
python -m http.server 8000
# http://localhost:8000 에서 열기
```

---

## 폴더 구조 / Files

```
sunny-editor/
├── index.html          ← 에디터 본체 (단일 HTML)
├── guide.html          ← 사용 가이드
├── favicon.svg
├── og-image.svg        ← 링크 공유 시 미리보기
├── README.md           ← 이 파일
├── samples/            ← 데모 사이트
│   ├── bakery/         ← 단일 페이지 샘플 (외부 CSS + 5개 이미지)
│   └── portfolio/      ← 다중 페이지 샘플 (index + about + contact + 공유 CSS + 7개 이미지)
└── _archive/           ← 옛 버전 보존
```

---

## 개발 메모 / Dev notes

- 단일 파일 `index.html` 안에 HTML + CSS + JS 통합.
- 외부 의존성: Pretendard, JetBrains Mono (CDN), JSZip (CDN, 동적 로드).
- 빌드 단계 없음. 정적 파일 그대로 호스팅.
- 디자인: 모노 + 푸른 액센트 `oklch(0.45 0.12 240)`. 둥근 카드 X, 이모지 X, 그라디언트 X.

---

## 라이선스 / License

소스코드는 자유롭게 열람·학습할 수 있습니다.
재배포·상업적 활용은 SUNNY ENTERTAINMENT INC.에 문의해 주세요.
Source is open for inspection. For redistribution or commercial use, contact SUNNY ENTERTAINMENT INC.

&copy; 2026 SUNNY ENTERTAINMENT INC. All rights reserved.
