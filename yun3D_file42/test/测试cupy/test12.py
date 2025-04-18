import cupy as cp

x = cp.array([[3, 1, 4],
              [1, 5, 9]])

# 求整组最小值
print(cp.min(x))  # 输出：1

# 求每列最小值（按行取最小值）
print(cp.min(x, axis=0))  # 输出：[1 1 4]

# 求每行最小值（按列取最小值）
print(cp.min(x, axis=1))  # 输出：[1 1]
