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


@app.get("/file_parse111")
async def index(id: int, path_file: str):
    # path_file = r"C:\Users\Administrator\Desktop\test1_demo\111.stl"
    print('file_parse111---:')
    from pathlib import Path
    suffix = Path(path_file).suffix
    print('suffix---:', suffix)

    data = {"success": False, "info": {}}
    if suffix == ".igs":
        from demo_igs_01 import demo_igs_01
        data = demo_igs_01(path_file)

    if suffix == ".obj":
        from demo_obj_01 import demo_obj_01
        data = demo_obj_01(path_file)

    if suffix == ".stl":
        from demo_stl_02 import demo_stl_02
        data = demo_stl_02(path_file)

    if suffix == ".stp":
        from demo_stp_01 import demo_stp_01
        data = demo_stp_01(path_file)

    result = dict(code=200, msg="完成:file_parse111", data=data)
    print("响应结果---:", result)
    return result


if __name__ == '__main__':
    print("""
    接口文档===================
    http://127.0.0.1:9002/docs
    http://127.0.0.1:9002/index
    http://127.0.0.1:9002/test
    """)
    uvicorn.run('main:app', host='0.0.0.0', port=9002, reload=True, workers=1)
    # uvicorn.run(app, host='0.0.0.0', port=9001)
