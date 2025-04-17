def aaa(path_file):
    print(f"=======读取文件=====================================================")
    import trimesh
    print("path_file---:", path_file)
    obj_mesh = trimesh.load_mesh(path_file)

    print(f"=======长宽高=====================================================")
    mesh = obj_mesh
    bounding_box_extents = mesh.bounding_box.extents
    length, width, height = bounding_box_extents
    length = float(length)
    width = float(width)
    height = float(height)

    print("length---:", length)
    print("width---:", width)
    print("height---:", height)

    print(f"=======体积和表面积===============================================")
    volume = mesh.volume
    area = mesh.area
    volume = float(volume)
    surface = float(area)
    print("volume---:", volume)
    print("surface---:", surface)

    print(f"=======顶点数和面片数===============================================")
    vertex_count = len(obj_mesh.vertices)
    face_count = len(obj_mesh.faces)
    points = vertex_count
    triangles = face_count
    print("points---:", points)
    print("triangles---:", triangles)

    print(f"=======绝对值===============================================")
    geometric_complexity = float(abs(points - triangles))
    structural_strength = float(abs(points / triangles))
    print("geometric_complexity---:", geometric_complexity)
    print("structural_strength---:", structural_strength)


if __name__ == '__main__':
    path_file = r"C:\Users\Administrator\Desktop\test1_demo\111.obj"
    aaa(path_file)
