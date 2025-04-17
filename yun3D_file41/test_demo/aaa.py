from pathlib import Path

file_path = Path("example.tar.gz")
suffix = file_path.suffix  # 只获取最后一个后缀，如 ".gz"
suffixes = file_path.suffixes  # 获取所有后缀，如 [".tar", ".gz"]

print(suffix)  # 输出: .gz
print(suffixes)  # 输出: ['.tar', '.gz']
