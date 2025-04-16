# -*- coding: utf-8 -*-
import os

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware as cross
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# 自定包=================
from stl_parser import StlParse


@app.get("/index")
async def index():
    result = dict(code=200, msg="成功")
    print("响应结果---:", result)
    return result


@app.get("/test")
async def index():
    path_file = r"C:\Users\Administrator\Desktop\test1_demo\111.stl"
    file_extension = os.path.splitext(path_file)[1]
    print("file_extension---:", file_extension)
    if file_extension != ".stl":
        result = dict(code=400, msg="失败:文件格式不是[stl]")
        print(result)
        return result
    else:
        stl_parser = StlParse(path_file)
        res = stl_parser.run()
        print("res---:", res)
        result = dict(code=200, msg="成功", res=res)
        print(result)
        return result


@app.get("/file_parse")
async def index(id: int, path_file: str):
    print("/file_parse---:")
    print("id---:", id)
    print("path_file---:", path_file)

    file_extension = os.path.splitext(path_file)[1]
    print("file_extension---:", file_extension)
    result = {
        "length": 0,
        "width": 0,
        "height": 0,
        "volume": 0,
        "surface": 0,
        "triangles": 0,
        "points": 0,
        "min_thickness": 0,
        "thickness_proportion": 0,
        "geometric_complexity": 0,
        "structural_strength": 0,
    }

    res = {}
    # stl_parser = StlParse(file_path)

    result = dict(code=200, msg="成功:file_parse")
    print("响应结果---:", result)
    return result


if __name__ == '__main__':
    print("""
    接口文档===================
    http://127.0.0.1:9001/docs
    http://127.0.0.1:9001/index
    http://127.0.0.1:9001/test
    """)
    uvicorn.run('main:app', host='0.0.0.0', port=9001, reload=True, workers=1)
    # uvicorn.run(app, host='0.0.0.0', port=9001)
