# docker

查看      sudo docker ps -a
删除      sudo docker   rm  -f xupeng_cai_rong

# git

本地分支跟踪远程分支    git branch --set-upstream-to=origin/xupeng xupeng

0.中文乱码问题
git config --global core.quotepath false  && git config --global i18n.commit.encoding utf-8 && git config --global i18n.logoutputencoding utf-8 &&  set LESSCHARSET=utf-8

0.克隆项目            git clone     git remote add origin https://e.coding.net/dtron/zidonghuayunhang/xp_work.git

1.绑定文件            git init && git remote add origin  git@github.com:astmain/study_odoo1.git

2.上传代码            echo "上传代码?"  &&    TIMEOUT /T 60  &&   echo "↑↑↑开始上传↑↑↑↑"  &&      git add . &&  git commit -m "许鹏:%date:~0,10% %time:~0,-3%"   &&  git push  -f   origin  xupeng

4.下载代码            echo "下载代码?" && TIMEOUT /T 60      &&   echo "开始下载"  &&  git fetch --all && git reset --hard origin/master && git pull origin master

git reset --hard    eefa95c9b6e8aaf41037554b9f18c202958d2d33  -f


// 强制推送到远程仓库，且覆盖远程代码库
git push -f --set-upstream origin:xupeng


git config -–global user.name "xupeng"
git config -–global user.email "1311192345@qq.com"

git config --global user.email "1311192345@qq.com"

git config -–global user.name "许鹏"





强制上传项目
1.绑定文件            git init && git remote add origin  https://e.coding.net/dtron/zidonghuayunhang/xp_work.git
echo "上传代码?"  &&    TIMEOUT /T 60  &&   echo "↑↑↑开始上传↑↑↑↑"  &&      git add . &&  git commit -m "许鹏:%date:~0,10% %time:~0,-3%"   &&  git push  -f   origin  master








idea 需要的驱动sqlite   https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.45.1.0/


配置内网穿透隧道
账号1311192345@qq.com
密码uuuuuu123456
官网                    https://dashboard.cpolar.com/auth
查看文档                https://www.cpolar.com/docs
安装exe                下载window系统的E:\AAAcpolar
查看官网token           https://dashboard.cpolar.com/auth
cmd执行验证token        cpolar authtoken M2M4NDk2YmItMmFlZS00OWJiLTk5YzItYzljOWVlZjc4ZDlh
本地cpolarUI界面        http://localhost:9200/#/status/online

最后完成
配置9999端口映射	    http://521b79c9.r7.cpolar.top/get1



//查询天气_心知天气   https://www.seniverse.com           账号密码15160315110/uuuuuu123456U.         开发文档 https://seniverse.yuque.com/hyper_data/api_v3
//https://api.seniverse.com/v3/location/search.json?key=SKddJ-aKQhqiEFiUf&q=泉州


服务器扩展虚拟内存=======================================================================
Swap 是 Linux 下的虚拟内存机制，用于在物理内存不足时，把一部分磁盘空间当作内存使用。
1. 查看当前 Swap 使用情况
swapon -s
free -h

2. 创建一个 4G 的 Swap 文件
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096

3. 设置正确的权限
sudo chmod 600 /swapfile

4. 格式化为 Swap
sudo mkswap /swapfile

5. 启用 Swap 文件
sudo swapon /swapfile

6. 设置开机自动挂载
sudo bash -c 'echo "/swapfile swap swap defaults 0 0" >> /etc/fstab'

7. 确认是否生效
free -h
swapon -s



安装 Docker Compose======================================================================
1下载
sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
2为下载的二进制文件添加可执行权限
sudo chmod +x /usr/local/bin/docker-compose
验证是否成功
docker-compose --version








vscode链接失败解决办法
管道错误是,记得清除 C:\Users\Administrator\.ssh\known_hosts   中的链接


