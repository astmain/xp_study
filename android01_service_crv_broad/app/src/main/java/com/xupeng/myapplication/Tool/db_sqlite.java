package com.xupeng.myapplication.Tool;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

public class db_sqlite extends SQLiteOpenHelper {


    db_sqlite(@Nullable Context context) {
        //
        super(context, "db_sqlite", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase DB) {
        //创建表
        DB.execSQL("create table user(id integer primary key autoincrement, name varchar(20), phone integer)");
        DB.execSQL("create table note(id integer primary key autoincrement,title text,content text)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}
