package com.xupeng.ndkdemo3;

//import static cn.hutool.core.lang.Console.log;


import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.xupeng.ndkdemo3.Tool.__;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "ME---";//logcat设置package:mine ME

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //java调c
        String result = new C1().sayHello();
        Log.d(TAG, "sayHello:" + result);


    }


    public void btn01_add(View view) {
        int result = new C1().add(111, 222);
        __.log(TAG, "result1", result);
        //Toast.makeText(this, "按钮被点击了", Toast.LENGTH_SHORT).show();
    }


    public void btn02_str_join(View view) {
        String result = new C1().str_join("111", "222");
        __.log(TAG, "result1", result);
    }

    public void btn03_arr_add100(View view) {
        int arr[] = {1, 2, 3};
        int arr2[] = new C1().arr_add100(arr);
        __.log(TAG, "arr2", arr2);
    }

    public void btn04_check_password(View view) {
        int code1 = new C1().check_password("123456");
        int code2 = new C1().check_password("1234567");
        __.log(TAG, "code1", code1);
        __.log(TAG, "code2", code2);
    }

    public void call_add2(View view) {
        int result = new C1().call_add2(111, 222);
        __.log(TAG, "333---result", result);

    }
}