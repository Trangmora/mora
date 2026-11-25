A=5770b4de99d3aa20fc30def60e2812bd
curl -s "https://api.cloudflare.com/client/v4/accounts/$A/pages/projects/bunchasake/deployments?env=production&per_page=3" | python3 -c "
import json,sys;d=json.load(sys.stdin)
for x in d['result']: print(x['id'],x['deployment_trigger']['metadata'].get('commit_hash','')[:7],x['latest_stage']['name'],x['latest_stage']['status'])"
