def cpu_igs_01(path_file):
    print(f"=======读取文件=====================================================")
    from OCC.Core.IGESControl import IGESControl_Reader
    from OCC.Core.IFSelect import IFSelect_RetDone

    obj_reader = IGESControl_Reader()
    status = obj_reader.ReadFile(path_file)
    print("obj_reader---:", obj_reader)
    print("status---:", status)
    print("IFSelect_RetDone---:", IFSelect_RetDone)

    if status != IFSelect_RetDone:
        raise Exception("无法读取 STEP 文件")

    obj_reader.TransferRoots()
    shape = obj_reader.Shape()

    print("obj_reader---:", obj_reader)
    print("shape---:", shape)

    print(f"=======长宽高=====================================================")
    from OCC.Core.Bnd import Bnd_Box
    from OCC.Core.BRepBndLib import brepbndlib

    bbox = Bnd_Box()
    brepbndlib.Add(shape, bbox)
    x_min, y_min, z_min, x_max, y_max, z_max = bbox.Get()
    length = x_max - x_min
    width = y_max - y_min
    height = z_max - z_min
    print("length---:", length)
    print("width---:", width)
    print("height---:", height)

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
    print("volume---:", volume)
    print("area---:", area)

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
    points = vertex_count
    triangles = face_count
    print("points---:", points)
    print("triangles---:", triangles)

    print(f"=======绝对值===============================================")
    geometric_complexity = float(abs(points - triangles))
    structural_strength = float(abs(points / triangles))
    print("geometric_complexity---:", geometric_complexity)
    print("structural_strength---:", structural_strength)

    return {"success": True, "info": {"geometric_complexity": geometric_complexity, "structural_strength": structural_strength}}


if __name__ == '__main__':
    path_file = r"C:\Users\Administrator\Desktop\test1_demo\111.igs"
    cpu_igs_01(path_file)
