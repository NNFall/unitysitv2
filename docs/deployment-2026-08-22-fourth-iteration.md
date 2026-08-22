# UNITY — деплой четвертой итерации

Дата: 22 августа 2026 года  
Публичный маршрут: `https://kaigo.space/site/unity/`  
Репозиторий: `https://github.com/NNFall/unitysitv2`

Релизный commit: `240691f` (`feat: polish unity mobile interactions`)  
Удаленный backup предыдущей версии: `/root/unitysite.backup-20260822-190251`

## Состав релиза

- premium FAQ accordion с контролируемым состоянием и доступными связями;
- live Yandex map с адресом и большой CTA под картой;
- compact events carousel без сервисных подсказок и pause-кнопок;
- скрытый autoplay 5,6 секунд, hover/focus pause и reduced-motion guard;
- pointer swipe для событий/отзывов и мобильный snap-rail форматов;
- animated mobile burger и заметная VK CTA;
- заголовок «Форматы отдыха в UNITY».

## Локальная проверка перед публикацией

- `npm test -- --run` — 7 файлов, 27 тестов passed;
- `npm run build` — passed;
- `npm audit --omit=dev --audit-level=high` — 0 vulnerabilities;
- `git diff --check` — без ошибок (только стандартные предупреждения Git о CRLF).

## Remote smoke checks

- `nginx -t` — syntax is ok, test is successful; `systemctl reload nginx` completed.
- `/site/unity` returns `308` to `/site/unity/`.
- `/site/unity/` returns `200` HTML; deployed `dist/index.html` SHA-256: `88f432cf180f2f66e9ea397255f1cf2a9196105bac9dded1dbad604758c952f3`.
- Release CSS `index-BZ9BhLCw.css`, JS `index-Cb1e6eGD.js` and hero PNG return `200`.
- Yandex map widget URL returns `200` HTML.
- Public Browser at 1920×1080 reports `clientWidth=1905`, `scrollWidth=1905`, `scrollHeight=5804`; at 390×844 reports `clientWidth=375`, `scrollWidth=375`, formats rail `display:flex`, seven FAQ items and no console warnings/errors.

Секреты и SSH-учетные данные в репозиторий, логи и этот отчет не записывались.
