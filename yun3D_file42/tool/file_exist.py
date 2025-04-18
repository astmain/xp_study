import os


def file_exist(path_file):
    # path_file = 'example.txt'
    if os.path.exists(path_file):
        return True
    else:
        msg = f"file_exist---文件不存在---path_file:{path_file}"
        print(msg)
        raise FileNotFoundError(msg)
