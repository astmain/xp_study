import cupy as cp

# 从 Python 列表创建 CuPy 数组
# a = cp.asarray([1.1, 2.2, 3.3], dtype=cp.float32)
a = cp.asarray([1.1, 2.2, 3.3])
print(a)  # [1 2 3], 但在 GPU 上
