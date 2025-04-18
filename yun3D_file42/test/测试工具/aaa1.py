from pathlib import Path

# 定义路径组件
base_path = Path("111")
sub_directory = "documents"
file_name = "example.txt"

# 拼接路径
full_path = base_path / sub_directory / file_name
print(full_path)

current_script_path = Path(__file__).resolve().parent
print("当前脚本文件所在的路径:", current_script_path)
