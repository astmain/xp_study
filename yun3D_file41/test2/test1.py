import os


def aaa(path_file):
    file_extension = os.path.splitext(path_file)[1]
    print("111---:", file_extension)
    return file_extension


if __name__ == '__main__':
    path_file = r"C:\Users\Administrator\Desktop\test1_demo\111.stl"
    print("111---:", aaa(path_file))
