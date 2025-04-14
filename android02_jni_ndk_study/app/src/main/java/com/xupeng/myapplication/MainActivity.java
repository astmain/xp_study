package com.xupeng.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.xupeng.myapplication.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "ME---";//logcat设置package:mine ME

    // Used to load the 'myapplication' library on application startup.
    static {
        System.loadLibrary("myapplication");
    }

    private ActivityMainBinding that;
    private String name = "小许";
    private static int age = 18;
    private double number = 10000;


    public native String stringFromJNI();    //  A native method that is implemented by the 'myapplication' native library,which is packaged with this application.

    //public native void my_change_name();
    public static native String StaticSetName();

    public native void setObj();

    public static native void setAge();

    public native void setNumber();

    public native void callAddMethod();
    public native void callShowStr();

    public int add(int num1, int num2) {
        Log.d(TAG, "c调用了我add");
        return num1 + num2;
    }


    public String showStr(String str) {
        Log.d(TAG, "c调用了我showStr");
        return "【 " + str + " 】";
    }




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        that = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(that.getRoot());
        methods();
    }


    public void methods() {
        that.tvName.setText(stringFromJNI());

        that.tvStaticSetName.setText(StaticSetName());

        Log.d(TAG, "name修改前:" + name);
        setObj();
        Log.d(TAG, "name修改后:" + name);

        Log.d(TAG, "age修改前:" + age);
        setAge();
        Log.d(TAG, "age修改后:" + age);

        Log.d(TAG, "number修改前:" + number);
        setNumber();
        Log.d(TAG, "number修改后:" + number);

        Log.d(TAG, "callAddMethod前:");
        callAddMethod();
        Log.d(TAG, "callAddMethod后:");

        Log.d(TAG, "callAddMethod前:");
        callShowStr();
        Log.d(TAG, "callAddMethod后:");


    }


}