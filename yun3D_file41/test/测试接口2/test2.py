import os

os.environ['CUDAFLAGS'] = '-arch=sm_61'

from stl_parser import StlParse

path_file = r"C:\Users\Administrator\Desktop\test1_demo\111.stl"
path_file = r"./111.stl"
stl_parser = StlParse(path_file)
res = stl_parser.run()
print("res---:", res)
