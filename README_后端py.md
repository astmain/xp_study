# 后端技术栈

fastapi,sqlalchemy,moment,pathlib

# python学习教程

跟着峰哥学编程               https://www.bilibili.com/video/BV1u84y1C7EL/

# requirements.txt_常用命令

生成requirements        pip freeze  >  requirements.txt
下载requirements        pip install -r requirements.txt

# pip_常用命令

pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ -i https://mirrors.aliyun.com/pypi/simple/ -i https://pypi.doubanio.com/simple/ package_name


pip install --upgrade pip
设置全局镜像源             还没有实践不知道能不能成功https://blog.csdn.net/weixin_43987408/article/details/111936078
pip config   set   global.index-url           https://pypi.org/simple/
pip config   set   global.extra-index-url     https://pypi.tuna.tsinghua.edu.cn/simple/
pip config   set   global.extra-index-url     https://mirrors.aliyun.com/pypi/simple/
pip config   set   global.extra-index-url     https://pypi.doubanio.com/simple/
pip config   list  
pip install  arrow
# 降级pip和Clash一起使用(win10系统pip install出现ProxyError错误)
https://www.cnblogs.com/kervias/p/16285814.html
python.exe -m pip install pip==20.2.4


# conda_常用常用命令

查看环境  conda info -e
创建环境  conda create -n pytorch_c python==3.9  --y        conda create -n simple_fastapi_1 python==3.8.18  --y
创建环境  conda create -n test01_311 python==3.11  --y        conda create -n simple_fastapi_1 python==3.8.18  --y
激活环境  conda activate pytorch_c
删除环境  conda remove -n pytorch_c --all --y
退出环境  conda deactivate

# 时间格式字符串化


import arrow   # 博客    https://blog.csdn.net/jiangbo721/article/details/84959335KK
arrow.get().to("Asia/Shanghai").format("YYYY_MM_DD__hh_mm_ss")    #时区
print('字符转时间', arrow.get('2020-01-01 23:00:00'))  # 2020-01-01T23:00:00+00:00
print('减去一个月', arrow.get('2020-01-01 23:00:00').shift(months=-1).format("YYYY-MM-DD"))  # 202001
print('最后  一天', arrow.get('2020-02').ceil('month').format("YYYY-MM-DD"))  # 202001
print('年1', arrow.get('2020-02').format("YYYY"))  # 2020
print('年2', arrow.get().format("YYYY"))  # 2024

ddd =  datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")  #2024-01-04 11:05:54

# fastapi教程
FastAPI_仿SpringBoot     https://www.bilibili.com/video/BV1D5411i7FT/
fastapi_中间件后台任务    https://www.bilibili.com/video/BV1wB4y1n78s
台任务                   https://www.bilibili.com/video/BV1iN411X72b?p=41

# pydantic_教程校验

pydantic接口定义检查     https://blog.csdn.net/sinat_26917383/article/details/132166674
Pydantic请求参数校验     https://www.cnblogs.com/HinaChan/p/14707369.html

# Schema 数据结构及类型校验详解

https://www.jb51.net/python/305426aj9.htm

# sqlalchemy教程博客

性能提升               https://deepinout.com/sql/sql-questions/77_sql_how_to_improve_sqlalchemy_performance.html
级联更新问题            https://pydoc.dev/sqlalchemy/latest/sqlalchemy.databases.oracle.html
数据库链接方式          https://www.cnblogs.com/harrychinese/archive/2012/09/12/My_Own_Tutorial_For_SqlAlchemy.html

# 基础包文件记录_python3.8.18

RUN   pip   install   requests==2.31.0
RUN   pip   install   pony==0.7.16
RUN   pip   install   urllib3==1.21.1
RUN   pip   install   aiofiles==23.2.1
RUN   pip   install   shortuuid==1.0.11
RUN   pip   install   python-docx==0.8.11
RUN   pip   install   uvicorn==0.20.0
RUN   pip   install   fastapi==0.78.0
RUN   pip   install   SQLAlchemy==2.0.7
RUN   pip   install   pymysql==1.0.2
RUN   pip   install   python-multipart==0.0.6
RUN   pip   install   pymongo==3.12.1
RUN   pip   install   cx-Oracle==8.3.0
RUN   pip   install   moment==0.12.1
RUN   pip   install   pylodash==0.4.4
RUN   pip   install   colorama==0.4.6
RUN   pip   install   pandas==1.1.4
RUN   pip   install   openpyxl==2.4.11
RUN   pip   install   schema==0.7.5


# odoo
0.视频教程
    神州数码云基地                      https://www.bilibili.com/video/BV11M4y1V7wb/
    UP主可可礼物          安装视频      https://www.bilibili.com/video/BV1Ga4y1B7F8/               https://www.bilibili.com/read/cv29086756/?jump_opus=1
    odoo启动报错                       https://blog.csdn.net/weixin_43274097/article/details/104369669
    运行                               python    odoo-bin -c C:\Users\Administrator\Desktop\odoo_17.0.latest\odoo17_test1\config\odoo.conf
    网页                               http://localhost:8069/web#action=38&model=ir.module.module&view_type=kanban&cids=1&menu_id=15
    脚手架命令                         python odoo-bin scaffold  a2_student odoo/addons



1.启用windows subsystem for Linux功能
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

2.启用虚拟机功能
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

2.重启电脑以完成WSL安装及更新打开PowerShell ,将WSL2设置为默认版本
      wsl --set-default-version 2

下载Linux内核更新包,双击运行
       https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi

在Windows Store中下载并安装Linux Distribution推荐使用Ubuntu 20.04 LTS :
     https://www.microsoft.com/store/apps/9n6svws3rx71




SpringBoot2+Mybatis 
https://www.bilibili.com/video/BV1GU4y1r7UV/?p=8




C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\Common7\Tools




# Windows核心编程(WIN32 - C/C++)
[](https://www.bilibili.com/video/BV17w4m1R7uJ?p=33&vd_source=7c75d2128986ff3eb6425f362d305c25)
[](https://www.bilibili.com/video/BV1Eh41157a1/?spm_id_from=333.337.search-card.all.click&vd_source=7c75d2128986ff3eb6425f362d305c25)
[](https://www.bilibili.com/video/BV1hE411C7sp/?spm_id_from=333.337.search-card.all.click&vd_source=7c75d2128986ff3eb6425f362d305c25)




# 6种将Python代码打包成exe应用的方式
https://www.jb51.net/python/296249qbf.htm

# 打包Nuitka 


pyinstaller 


Fastapi打包exe后无限启动导致死机的解决办法
https://blog.csdn.net/weixin_43721000/article/details/135683511



 # import win32api 错误问题
import win32api, win32gui, win32con  # pip  install pywin32 可能会出现问题_请看README_后端py.md

handle_wind = win32gui.FindWindow(None, '小红书创作服务平台 - Google Chrome')
print("hwnd            :", handle_wind)

res = win32gui.ShowWindow(handle_wind, 0)
print("res             :", res)

"""

ImportError: DLL load failed while importing win32gui: 找不到指定的程序。

卸载重装
pip  uninstall   pywin32 -y
pip  install     pywin32


cmd到目录下,执行激活conda具体环境,运行代码
cd D:\conda\envs\sss111
conda activate sss111
python.exe Scripts/pywin32_postinstall.py -install


看到结果证明问题解决
The pywin32 extensions were successfully installed.

"""
