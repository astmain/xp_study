def cpu_stp_01(path_file):
    print(f"=======读取文件=====================================================")
    from OCC.Core.STEPControl import STEPControl_Reader
    from OCC.Core.IFSelect import IFSelect_RetDone
    step_reader = STEPControl_Reader()
    status = step_reader.ReadFile(path_file)
    if status != IFSelect_RetDone: raise Exception("无法读取 STEP 文件")
    step_reader.TransferRoot()
    shape = step_reader.Shape()
    print('111---:', status)
    print('shape---:', shape)

    print(f"=======长宽高=====================================================")
    from OCC.Core.Bnd import Bnd_Box
    from OCC.Core.BRepBndLib import brepbndlib

    bbox = Bnd_Box()
    brepbndlib.Add(shape, bbox)
    x_min, y_min, z_min, x_max, y_max, z_max = bbox.Get()
    length = x_max - x_min
    width = y_max - y_min
    height = z_max - z_min
    parse_result = {}
    parse_result["length"] = float(length)
    parse_result["width"] = float(width)
    parse_result["height"] = float(height)
    print('parse_result---:', parse_result)

    print(f"=======体积和表面积===============================================")
    from OCC.Core.GProp import GProp_GProps
    from OCC.Core.BRepGProp import brepgprop
    props = GProp_GProps()
    # 计算体积
    brepgprop.VolumeProperties(shape, props)
    volume = props.Mass()
    # 计算表面积
    brepgprop.SurfaceProperties(shape, props)
    area = props.Mass()
    parse_result["volume"] = float(volume)
    parse_result["surface"] = float(area)
    print('parse_result["volume"]---:', parse_result["volume"])
    print('parse_result["surface"]---:', parse_result["surface"])

    print(f"=======顶点数和面片数===============================================")
    from OCC.Core.TopExp import TopExp_Explorer
    from OCC.Core.TopAbs import TopAbs_VERTEX, TopAbs_FACE

    vertex_count = 0
    face_count = 0

    # 统计顶点数
    explorer = TopExp_Explorer(shape, TopAbs_VERTEX)
    while explorer.More():
        vertex_count += 1
        explorer.Next()

    # 统计面片数
    explorer = TopExp_Explorer(shape, TopAbs_FACE)
    while explorer.More():
        face_count += 1
        explorer.Next()

    parse_result["points"] = vertex_count
    parse_result["triangles"] = face_count
    print('parse_result["points"] ---:', parse_result["points"])
    print('parse_result["triangles"] ---:', parse_result["triangles"])

    print(f"=======绝对值===============================================")
    points = parse_result["points"]
    triangles = parse_result["triangles"]
    parse_result["geometric_complexity"] = float(abs(points - triangles))
    parse_result["structural_strength"] = float(abs(points / triangles))
    print('parse_result["geometric_complexity"]---:', parse_result["geometric_complexity"])
    print('parse_result["structural_strength"]---:', parse_result["structural_strength"])

    geometric_complexity = parse_result["geometric_complexity"]
    structural_strength = parse_result["structural_strength"]
    return {"success": True, "info": {"geometric_complexity": geometric_complexity, "structural_strength": structural_strength}}


if __name__ == '__main__':
    path_file = r"C:\Users\Administrator\Desktop\test1_demo\111.stp"
    cpu_stp_01(path_file)
