#!/bin/sh
# sudo  sh  uninstall.sh   &&   sudo  sh  创建nginx_install.sh 

echo '## 一:1先删除旧版本容器               2sudo  docker ps -a  试着访问http://103.119.2.223:5566'
sudo  docker rm  -f      nginx_5566
sudo  docker run --name  nginx_5566 -p 5566:80 -d nginx:1.17.8


echo '## 二:2宿主机创建目录html,logs,conf   2拷贝容器nginx.conf到宿主机'
sudo  mkdir -p  /nginx_5566/html

sudo  mkdir -p  /nginx_5566/logs

sudo  mkdir -p  /nginx_5566/conf

sudo  docker cp nginx_5566:/etc/nginx/nginx.conf      /nginx_5566/conf/nginx.conf
wait
echo  '## 三:1先删除旧版本容器               2重新运行容器-v映射目录'
sudo  docker rm -f nginx_5566
wait
sleep 5
sudo  docker run -d -p 5566:80 --name nginx_5566 -v /nginx_5566/html:/usr/share/nginx/html -v /nginx_5566/conf/nginx.conf:/etc/nginx/nginx.conf -v /nginx_5566/logs:/var/log/nginx  --privileged=true  nginx:1.17.8


echo  "## 四:创建一个index.html文件"
echo  "我是新的index555" > nginx_5566/html/index.html
wait
echo  "请访问        http://103.119.2.223:5566/index.html                   "
echo  "请访问        http://103.119.2.223:5566/test03_art学习/index.html    "
echo  "请访问        http://103.119.2.223:5566/docs_java/index.html         "
echo  "请访问        http://103.119.2.223:5566/element_plus/index.html      "





