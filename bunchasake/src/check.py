import os,re,sys,json,html
SITE='/home/user/mora/bunchasake/site'
pages=[]
for r,d,f in os.walk(SITE):
    for x in f:
        if x.endswith('.html'): pages.append(os.path.join(r,x))
def exists(u):
    u=u.split('#')[0].split('?')[0]
    if u=='' : return True
    p=os.path.join(SITE,u.lstrip('/'))
    return os.path.isfile(p) or os.path.isfile(os.path.join(p,'index.html'))
bad=[];stats={'pages':len(pages),'int':0,'ext':set(),'ld':0}
alts={}
for p in pages:
    s=open(p,encoding='utf8').read(); rel='/'+os.path.relpath(p,SITE).replace('index.html','')
    ns=re.sub(r'<script(?! type="application/ld)[\s\S]*?</script>','',s)
    for m in re.finditer(r'(?:href|src|poster)="([^"]+)"',ns):
        u=html.unescape(m.group(1))
        if u.startswith('/') and not u.startswith('//'):
            stats['int']+=1
            if not exists(u): bad.append((rel,u))
        elif u.startswith('http'):
            if u.startswith('https://bunchasake.com'):
                if not exists(u[len('https://bunchasake.com'):]): bad.append((rel,u))
            else: stats['ext'].add(u.split('/')[2])
        elif u.startswith(('mailto:','#','data:')): pass
        else: bad.append((rel,'RELATIVE '+u))
    if '{{' in re.sub(r'<script[\s\S]*?</script>','',s): bad.append((rel,'unresolved placeholder'))
    for m in re.finditer(r'<script type="application/ld\+json">([\s\S]*?)</script>',s):
        try: json.loads(m.group(1)); stats['ld']+=1
        except Exception as e: bad.append((rel,'bad JSON-LD '+str(e)))
    if rel!='/404.html':
        c=re.search(r'rel="canonical" href="([^"]+)"',s)
        if not c or c.group(1)!='https://bunchasake.com'+rel: bad.append((rel,'canonical '+str(c and c.group(1))))
        alts[rel]=dict(re.findall(r'hreflang="(en|vi)" href="https://bunchasake.com([^"]+)"',s))
        if len(re.findall(r'<h1[ >]',s))!=1: bad.append((rel,'h1 count %d'%len(re.findall(r'<h1[ >]',s))))
        t=re.search(r'<title>([^<]*)</title>',s); d=re.search(r'<meta name="description" content="([^"]*)"',s)
        if not t or not d or len(html.unescape(t.group(1)))>65 or len(html.unescape(d.group(1)))>165: bad.append((rel,'title/desc len %s %s'%(t and len(html.unescape(t.group(1))), d and len(html.unescape(d.group(1))))))
for rel,a in alts.items():
    for l,u in a.items():
        if u!=rel and alts.get(u,{}).get('en' if l=='vi' else 'vi')!=rel: bad.append((rel,'hreflang not reciprocal -> '+u))
sm=open(SITE+'/sitemap.xml').read(); locs=re.findall(r'<loc>https://bunchasake.com([^<]+)</loc>',sm)
for u in locs:
    if not exists(u): bad.append(('sitemap',u))
missing=[r for r in alts if r not in locs]
print(stats['pages'],'pages |',stats['int'],'internal refs |',stats['ld'],'JSON-LD blocks | sitemap',len(locs),'| not in sitemap:',missing)
print('external hosts:',sorted(stats['ext']))
print('PROBLEMS:',len(bad)); [print('  ',b) for b in bad[:40]]
