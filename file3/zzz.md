pip install cupy-cuda11x

生成requirements        pip freeze  >  requirements.txt

http://192.168.0.250:8888/docs

http://192.168.0.250:8888/test

成功
http://192.168.0.250:8888/api/v1/fileparse/test

docker rm -f file3
docker-compose up -d                       docker compose up -d
docker ps -a
docker-compose logs file3
docker-compose  restart

docker exec -it file3  /bin/bash
cd file3  && python demo_test2.py


docker-compose logs  fastapi-service




conda============================================
创建环境  conda create -n test3 python=3.11  -y	

安装包
pip install -r   package.txt
conda install -c conda-forge cupy cudatoolkit=11.8 -y 
conda install -c conda-forge cupy cudatoolkit=11.4 -y 
conda install -c conda-forge pythonocc-core=7.8.1.1 -y 


检查 CUDA 版本
nvcc --version




