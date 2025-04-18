from tool.file_suffix import file_suffix
from tool.file_dir import file_dir
from tool.file_join import file_join
from tool.file_exist import file_exist


class tool:
    # 文件操作============================================
    file_suffix = file_suffix
    file_exist = file_exist
    file_dir = file_dir
    file_join = file_join

    def __init__(self):
        self.file_suffix = file_suffix
