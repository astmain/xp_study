pip install cupy-cuda11x

生成requirements        pip freeze  >  requirements222.txt

http://192.168.0.250:8888/docs

http://192.168.0.250:8888/test

成功
http://192.168.0.250:8888/api/v1/fileparse/test

docker rm -f file3
docker-compose up -d
docker ps -a
docker exec -it file3 /bin/bash
docker-compose logs file3

docker-compose  restart
docker-compose logs  fastapi-service




conda============================================
创建环境  conda create -n test3 python=3.12  -y	

安装包
pip install -r   package.txt
conda install -c conda-forge cupy cudatoolkit=11.8 -y 
conda install -c conda-forge cupy cudatoolkit=11.4 -y 
conda install -c conda-forge pythonocc-core=7.8.1.1 -y 


检查 CUDA 版本
nvcc --version
NVIDIA_GPU的基本信息    nvidia-smi




cudatoolkit下载
https://developer.nvidia.com/cuda-toolkit-archive


Cupy的安装教程
https://zhuanlan.zhihu.com/p/613434205




conda    activate   test21



conda install -c conda-forge cupy=12.*  -y
conda install -c conda-forge cupy       -y

python main.py
python main4.py




