# UNITY — финальная публикация 26 августа 2026

## Релиз

- Исходный commit: `c498788b60f855673870e871ef4d648b5c9641a0`.
- GitHub: `origin/main` подтверждён через `git ls-remote` на том же SHA.
- Локальный QA-стенд сохранён на `http://127.0.0.1:4175/`.
- Публичный адрес: `https://kaigo.space/site/unity/`.

## Проверки перед публикацией

- `npm run test:run`: 9 файлов, 42/42 теста прошли.
- `npm run build`: Vite 7.3.6, production build завершён успешно.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities.
- `git diff --check` и проверка release-range: без ошибок.
- Runtime paper texture: `5.05 kB` WebP вместо `2,339.90 kB` PNG.

## Сервер

- Проверенный `dist` перед переключением загружен в отдельный release-каталог; контрольные SHA-256 для HTML, JS, CSS, paper texture и hero совпали с локальной сборкой.
- Активный каталог атомарно переключён на `/root/unitysite`.
- Предыдущая версия сохранена в `/root/unitysite.backup-20260826-154638`.
- Каталоги релиза приведены к `755`, файлы — к `644`.
- `nginx -t`: syntax is ok, test is successful; Nginx после reload имеет статус `active`.
- Проверка HTTP: HTML `200`, hero WebP `200 / 153832 B`, paper texture `200 / 5050 B`.
- В конфигурации Nginx остаются ранее существовавшие warnings о дублирующихся server names/protocol options; они не блокируют конфигурацию и не относятся к UNITY location.

## Production Browser QA

Проверено во встроенном Browser на свежей публичной странице:

- `1920×1080`: `clientWidth=scrollWidth=1905`; event CTA внутри feature-card; review/community имеют одинаковые `top` и высоту `405px`; новый hashed bundle и 5.05 kB texture загружены; console warnings/errors — 0.
- `390×844`: `clientWidth=scrollWidth=375`; hero labels не пересекаются; обе event-preview кнопки по `44px` полностью внутри карточек; все три reviews имеют высоту `510px`; autoplay `01→02`, ручной выбор сохраняет `03` после 5.9 секунды; menu/Escape, карта и FAQ работают; console warnings/errors — 0.
- `320×844`: `clientWidth=scrollWidth=305`; review-card `570px`; hero overlap `0`; обе event-preview кнопки полностью внутри карточек; console warnings/errors — 0.
- Документальная фотография входа загрузилась из `assets/venue/unity-yandex-01.jpg` с `naturalWidth=1024`.

Публичная версия соответствует локально проверенному release commit и готова к демонстрации.

## Mobile carousel follow-up release

- Runtime commits: `61771ae94c7c1c57162712df2844d4b85e46dfb7` (mobile rails) and `146e087dd35fbafb19dd7601549171e4461fea32` (hidden ticket scrollbar).
- `origin/main` was checked against `146e087dd35fbafb19dd7601549171e4461fea32` after push.
- `npm run test:run`: 10 files, `48/48` tests passed; `npm run build` completed successfully with Vite 7.3.6.
- The verified 35-file, 24 MB `dist` was uploaded to a separate release directory. SHA-256 of `index.html`, the JavaScript bundle, and the CSS bundle matched local output before each atomic switch.
- The final live directory was atomically switched to `/root/unitysite`; the immediately preceding release remains in `/root/unitysite.backup-20260826-175300`.
- `nginx -t` completed successfully and Nginx reloaded as `active`. Existing unrelated duplicate-server-name/protocol warnings remain non-blocking.
- Public HTTP check: `https://kaigo.space/site/unity/` returns `200` and references `index-B8eufRIE.js` plus `index-BoTyLdwb.css`.
- Fresh in-app Browser QA at `390×844`: `clientWidth=scrollWidth=375`; event-ticket rail remains horizontally swipeable (`343/606px`) with `scrollbar-width: none`; formats auto-advance and event arrow/swipe behavior were rechecked in the preceding runtime release; console warnings/errors: `0`.
