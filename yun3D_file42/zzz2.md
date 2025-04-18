创建环境 conda create -n  test43 python=3.12 -y
激活环境 conda activate   test43

安装包
pip install -r requirements.txt
conda install -c conda-forge cupy -y
conda install -c conda-forge pythonocc-core=7.8.1.1 -y

运行解析文件
python test11.py
python test12.py
python demo_test2.py




生产conda_env
conda env export > environment.yml



conda create --name myenv --file environment.yml --dry-run








