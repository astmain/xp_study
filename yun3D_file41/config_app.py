# -*- coding: utf-8 -*-
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="My App")

## 跨域设置==================================================================
app.add_middleware(CORSMiddleware, allow_credentials=True, allow_methods=["*"], allow_headers=["*"], allow_origins=["*", "http://localhost:3000"], )


## 静态资源设置=================================================================
# app.mount("/static", StaticFiles(directory="static"), name="static")  # http://127.0.0.1:9151/static/png.png
# app.mount("/dist", StaticFiles(directory="dist"), name="dist")  # http://127.0.0.1:9151/dist/index.html


@app.get("/index")
async def index():
    result = dict(code=200, msg="成功")
    print("响应结果---:", result)
    return result


if __name__ == '__main__':
    print('111---:', 111)
