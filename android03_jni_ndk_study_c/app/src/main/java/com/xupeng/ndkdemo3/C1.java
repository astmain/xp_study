package com.xupeng.ndkdemo3;

import com.xupeng.ndkdemo3.Tool.__;

public class C1 {
    private static final String TAG = "ME---";//logcat设置package:mine ME

    //引入动态链接库
    static {
        System.loadLibrary("CXX_OS");
    }

    //java目录下         javah com.xupeng.ndkdemo3.C1              自定生产的c语言头文件

    //
    public native String sayHello();

    public native int add(int a1, int a2);

    public native String str_join(String a1, String a2);

    public native int[] arr_add100(int[] arr);//todo 有问题https://www.bilibili.com/video/BV1qW411L7oY?p=30

    public native int check_password(String password);

    public native int call_add2(int a1, int a2);


    public int add2(int a1, int a2) {
        int result = a1 + a2;
        __.log(TAG, "222---add2---我被调用了---result", result);
        return result;
    }
}
