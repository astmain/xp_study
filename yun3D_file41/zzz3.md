创建环境 conda create -n  test51 python=3.9 -y
激活环境 conda activate   test51


安装包
pip install -r requirements.txt
conda install -c conda-forge cupy=11.4.* pythonocc-core python=3.9 -y


运行解析文件
python test11.py
python test12.py
python demo_stl_01.py

python test_env.py