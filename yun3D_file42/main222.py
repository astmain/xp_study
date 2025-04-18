# -*- coding: utf-8 -*-
import uvicorn
from config_app import app

# 路由引入=====================================
from api_cup_parse import route as api_cup_parse

# 路由注册=====================================
app.include_router(api_cup_parse, tags=["cup解析", ])

if __name__ == '__main__':
    print("""
    接口文档===================
    http://127.0.0.1:9002/docs
    http://127.0.0.1:9002/index
    http://127.0.0.1:9002/test
    """)
    uvicorn.run('main222:app', host='0.0.0.0', port=9003, reload=True, workers=1)
    # uvicorn.run(app, host='0.0.0.0', port=9001)
