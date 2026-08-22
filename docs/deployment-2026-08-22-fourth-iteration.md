# UNITY — деплой четвертой итерации

Дата: 22 августа 2026 года  
Публичный маршрут: `https://kaigo.space/site/unity/`  
Репозиторий: `https://github.com/NNFall/unitysitv2`

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

Секреты и SSH-учетные данные в репозиторий, логи и этот отчет не записывались.

