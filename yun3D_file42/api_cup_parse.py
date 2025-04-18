from fastapi import APIRouter

from tool import tool
from tool_cpu.cpu_igs_01 import cpu_igs_01
from tool_cpu.cpu_obj_01 import cpu_obj_01
# from tool_cpu.cpu_stl_01 import cpu_stl_01
from tool_cpu.cpu_stl_02 import cpu_stl_02
from tool_cpu.cpu_stp_01 import cpu_stp_01

route = APIRouter()


def run(path_file):
    tool.file_exist(path_file)
    suffix = tool.file_suffix(path_file)
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

    print('data---:', data)
    return data


@route.post("/cpu_parse")
def cpu_parse(uid: str = "123", path_file: str = tool.file_join("static/111.stl")):
    # def cpu_parse(uid: str = "123", path_file: str = tool.file_join("static/111.igs")):
    try:
        data = run(path_file)
        result = {'code': 200, 'msg': "成功", 'data': data}
        print(result)
        return result
    except Exception as error:
        result = {'code': 400, 'msg': f"失败:{str(error)}", 'data': {}}
        print(result)
        return result


if __name__ == '__main__':
    path_file = tool.file_join("static/111.stl")
    run(path_file)
