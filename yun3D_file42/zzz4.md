创建环境 conda create -n  test1 python=3.12 -y
激活环境 conda activate   test1


安装包
pip install -r requirements.txt
conda install -c conda-forge cupy pythonocc-core  -y


运行解析文件
python test11.py
python test12.py
python demo_stl_01.py

python test_env.py




生产环境    conda env export > env_python.yml
导入环境    conda env create -f env_python.yml




fastapi文档
https://zhuanlan.zhihu.com/p/19954736406
https://github.com/DeanWay/fastapi-versioning



非常棒awesome
https://github.com/mjhea0/awesome-fastapi
