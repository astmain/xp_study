import cupy as cp

print("cupy---找到了:", cp)
print("cupy---version:", cp.__version__)

print("cupy---arange:", cp.array([1, 2, 3, 4, 5]))

list_val = cp.array([[3, 1, 4],
                     [1, 5, 9]])
min_val = cp.min(list_val, axis=0)
max_val = cp.max(list_val, axis=1)

print("cupy---list_val---:", list_val)
print("cupy---min_val:", min_val)
print("cupy---max_val:", max_val)
