package com.xupeng.ndkdemo3.Tool;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import androidx.annotation.Nullable;

import cn.hutool.json.JSONObject;

public class __ {


    //public static Consumer<Object> log = Console::log;

    public static void log(Object... args) {
        log.run(args);
    }


    public static String json_obj_to_str(Object obj1) {
        return json_obj_to_str.run(obj1);
    }

    public static JSONObject json_str_to_obj(String str1) {
        return json_str_to_obj.run(str1);
    }

    public static String ajax_post(String url, String json_str) {
        return ajax_post.run(url, json_str);
    }

    public static String ajax_get(String url) {
        return ajax_get.run(url);
    }

    public static SQLiteDatabase db_sqlite(@Nullable Context context) {
        return new db_sqlite(context).getWritableDatabase();
    }

    public static String time_mill_to_minute_second(long mill) {
        return time_mill_to_minute_second.run(mill);
    }


}
