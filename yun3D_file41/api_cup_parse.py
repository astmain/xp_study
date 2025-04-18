from fastapi import APIRouter
from pathlib import Path
from tool_cpu.cpu_igs_01 import cpu_igs_01
from tool_cpu.cpu_obj_01 import cpu_obj_01
# from tool_cpu.cpu_stl_01 import cpu_stl_01
from tool_cpu.cpu_stl_02 import cpu_stl_02
from tool_cpu.cpu_stp_01 import cpu_stp_01

route = APIRouter()


@route.post("/cpu_parse")
async def cpu_parse(id: str, path_file):
    suffix = Path(path_file).suffix
    print('suffix---:', suffix)

    data = {"success": False, "info": {}}
    if suffix == ".igs":
        data = cpu_igs_01(path_file)

    if suffix == ".obj":
        data = cpu_obj_01(path_file)

    if suffix == ".stl":
        data = cpu_stl_02(path_file)

    if suffix == ".stp":
        data = cpu_stp_01(path_file)

    result = {}
    result['code'] = 200
    result['msg'] = "成功"
    return result
