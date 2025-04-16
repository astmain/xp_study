import concurrent.futures
import numpy as np
from numba import jit
from stl import mesh
import time
import struct
import trimesh
from scipy.spatial import cKDTree


# import cupy as cp


class StlParse:
    def __init__(self, file_path):
        self.file_path = file_path
        stl_mesh = mesh.Mesh.from_file(file_path)
        # 获取顶点数据并转换为 GPU 数组
        # self.mesh = stl_mesh
        # self.vectors = stl_mesh.vectors
        # self.vectors_gpu = cp.asarray(self.vectors, dtype=cp.float32)
        # self.parse_result = {"triangles": len(self.vectors)}
        # print("stl_mesh---:", stl_mesh)
        # self.vectors = stl_mesh.vectors
        # print("   self.vectors---:", self.vectors)
        zzz = 1


if __name__ == '__main__':
    StlParse(r'C:\Users\Administrator\Desktop\6.stl')
