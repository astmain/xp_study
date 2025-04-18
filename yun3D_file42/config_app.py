# -*- coding: utf-8 -*-
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="My App")

# 跨域设置==================================================================
app.add_middleware(CORSMiddleware, allow_credentials=True, allow_methods=["*"], allow_headers=["*"], allow_origins=["*", "http://localhost:3000"], )

# 静态资源=================================================================
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/index")
async def index(name: str = "小许"):
    from tool import tool
    print('name---:', name)
    print('111---:', os.environ.get("api"))

    print('222---:', tool.file_join("static\\111.stl"))
    result = dict(code=200, msg="成功")
    print("响应结果---:", result)
    return result


if __name__ == '__main__':
    print('111---:', 111)
