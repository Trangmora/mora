#!/bin/bash
# Báo IndexNow (Bing, Yandex, Seznam, Naver...) các URL vừa thay đổi. Chạy SAU khi Cloudflare deploy xong.
#   bash src/indexnow.sh              → mọi URL trong sitemap có lastmod = hôm nay (UTC)
#   bash src/indexnow.sh 2026-11-25   → mọi URL có lastmod = ngày đó
#   bash src/indexnow.sh URL1 URL2    → đúng các URL này
cd "$(dirname "$0")/.." || exit 1
KEY=$(grep -o 'INDEXNOW_KEY = "[a-f0-9]*"' src/build.cjs | grep -o '[a-f0-9]\{32\}')
python3 - "$KEY" "$@" <<'PY'
import sys,re,json,datetime,urllib.request
key,args=sys.argv[1],sys.argv[2:]
if args and args[0].startswith('http'): urls=args
else:
    day=args[0] if args else datetime.datetime.utcnow().strftime('%Y-%m-%d')
    sm=open('site/sitemap.xml').read()
    urls=[m.group(1) for m in re.finditer(r'<url><loc>([^<]+)</loc><lastmod>([^<]+)</lastmod>',sm) if m.group(2)==day]
if not urls: print('IndexNow: không có URL nào để báo'); sys.exit(0)
body=json.dumps({"host":"bunchasake.com","key":key,"keyLocation":f"https://bunchasake.com/{key}.txt","urlList":urls}).encode()
req=urllib.request.Request('https://api.indexnow.org/indexnow',data=body,headers={'Content-Type':'application/json; charset=utf-8'})
try:
    r=urllib.request.urlopen(req,timeout=60); print('IndexNow:',r.status,'·',len(urls),'URL')
except urllib.error.HTTPError as e:
    print('IndexNow lỗi:',e.code,e.read()[:200])
PY
