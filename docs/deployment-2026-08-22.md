# UNITY deployment evidence

Дата: 2026-08-22  
Commit: `6a5b4ee` (`feat: polish unity landing and deploy-ready assets`)  
Repository: `https://github.com/NNFall/unitysitv2.git`  
Public URL: `https://kaigo.space/site/unity/`

## Remote target

- Host: `5.129.236.90:22`
- Path: `/root/unitysite`
- Server: Nginx, existing `kaigo.space` server block
- Static route: `/etc/nginx/snippets/unitysite.conf`, included by the existing `kaigo.space` configuration
- Rollback copy of the pre-existing Nginx server config: `/root/kaigo.space.unity-backup-20260822-163523`
- The target directory did not exist before this deployment, so no previous Unity site files were replaced.

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
- `https://kaigo.space/site/unity` — HTTP 308 to `/site/unity/`.

## Browser checks against the public URL

The in-app Browser loaded the deployed page at `https://kaigo.space/site/unity/` with the expected title, hero and four format cards. After scrolling the full page, all 12 images loaded and the console remained error-free. At `390×844`, `scrollWidth=375`; at `320×844`, `scrollWidth=320`; both mobile checks had no unexpected horizontal overflow and no console errors.
