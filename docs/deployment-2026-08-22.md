# UNITY deployment evidence

Дата: 2026-08-22  
Commit: `5d122c8` (`feat: refine unity third iteration`)
Repository: `https://github.com/NNFall/unitysitv2.git`  
Public URL: `https://kaigo.space/site/unity/`

## Remote target

- Host: `5.129.236.90:22`
- Path: `/root/unitysite`
- Server: Nginx, existing `kaigo.space` server block
- Static route: `/etc/nginx/snippets/unitysite.conf`, included by the existing `kaigo.space` configuration
- Rollback copy of the pre-existing Nginx server config: `/root/kaigo.space.unity-backup-20260822-163523`
- Third-iteration release was staged before replacing the target directory.
- Rollback copy of the previous Unity release: `/root/unitysite.backup-20260822-172226`

The uploaded release archive was verified on the server before extraction:

`ddccb9148c1e00613ab2389056c214df35a4dfe729727011b91f4c9d9472cfc4`

## Server checks

- `nginx -t` — syntax is ok, test is successful.
- `systemctl reload nginx` — completed.
- `https://kaigo.space/site/unity/` — HTTP 200, HTML.
- `https://kaigo.space/site/unity/assets/index-Oc83N0BS.js` — HTTP 200, JavaScript.
- `https://kaigo.space/site/unity/assets/index-CAkKLF1n.css` — HTTP 200, CSS.
- `https://kaigo.space/site/unity/assets/editorial/unity-ai-entrance-v2.png` — HTTP 200, PNG.
- `https://kaigo.space/site/unity/assets/venue/unity-yandex-05.jpg` — HTTP 200, JPEG.
- `https://kaigo.space/site/unity/assets/editorial/unity-ai-hero-billiards-v3.png` — HTTP 200, PNG; SHA-256 `b91fe1da6d581e4161116b32739cd68bdc483c32358452fac197e65ee0f2a8ee`.
- `https://yandex.ru/map-widget/v1/?ll=50.218693%2C53.203295&mode=search&oid=223835723975&ol=biz&z=17&lang=ru_RU` — HTTP 200, HTML map frame.
- `https://kaigo.space/site/unity` — HTTP 308 to `/site/unity/`.

## Browser checks against the public URL

The in-app Browser loaded the deployed page at `https://kaigo.space/site/unity/` with the expected title, new hero asset, live Yandex iframe and four format cards. At the desktop CSS viewport (`1920×1080`, Browser surface `clientWidth=1905`), `scrollWidth=1905` and `scrollHeight≈5739`. At `390×844`, `scrollWidth=375`, hero image begins around `y≈713`, and the map iframe is `330px` high. At `320×844`, `clientWidth=scrollWidth=305` with no horizontal scrollbar. The mobile menu opened/closed with Escape, the event carousel advanced after its interval, and all 7 FAQ items rendered. No console errors were observed during the fresh-load checks.
