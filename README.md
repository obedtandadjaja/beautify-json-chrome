# beautify-json-chrome
JSON formatter Chrome extension

Formats JSON responses like:

```{"type":"object","properties":{"status":{"type":"string"},"data":{"type":"object","properties":{"orders":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer"},"status":{"type":"string"},"person":{"type":"object","properties":{"first_name":{"type":"string"},"last_name":{"type":"string"}},"required":["first_name","last_name"]},"vin":{"type":"string"},"stock_number":{"type":"string"},"created_at":{"type":"string"}},"required":["id","status","person","vin","stock_number","created_at"]}},"total_pages":{"type":"integer"},"current_page":{"type":"integer"}},"required":["orders","current_page","total_pages"]}},"required":["status","data"]}```

to:

<img src="https://github.com/obedtandadjaja/beautify-json-chrome/blob/master/screenshots/screenshot1.png" width='600px'/>

Features:
- Indentation
- Color code
- Automatic JSON validation/parsing
- Hover on selection

Features coming soon:
- Collapse all
- Expand all
