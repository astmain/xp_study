package com.xupeng.myapplication;


import static cn.hutool.core.lang.Console.log;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.xupeng.myapplication.adapter.Adapter_Song;
import com.xupeng.myapplication.adapter.Song;

import java.util.ArrayList;


public class MainActivity extends AppCompatActivity {
    private static final String TAG = "ME---";//logcat设置package:mine ME
    public com.xupeng.myapplication.databinding.MainActivityBinding that;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        that = com.xupeng.myapplication.databinding.MainActivityBinding.inflate(getLayoutInflater());
        setContentView(that.getRoot());
        methods();
        log(TAG, "onCreate");

        init_rcv_view();
    }


    //初始化音乐播放器
    void init_rcv_view() {
        //获取rcv试图
        RecyclerView view = findViewById(R.id.rcv_view);

        //初始化数据
        ArrayList<Song> data = new ArrayList<>();
        data.add(new Song("演员.mp3"));
        data.add(new Song("蜗牛.mp3"));
        data.add(new Song("黑色幽默.mp3"));

        //配置适配器
        Adapter_Song adapter = new Adapter_Song(this, data);
        view.setAdapter(adapter);
        view.setLayoutManager(new LinearLayoutManager(this));
        adapter.set_item_click(new Adapter_Song.My_interface_click() {
            @Override
            public void my_click(int position) {
                log(TAG, "333---点击了第" + position + "首歌");
                Toast.makeText(MainActivity.this, "消息", Toast.LENGTH_SHORT).show();

                //跳转到播放页面
                Intent intent = new Intent(MainActivity.this, song_play.class);
                Song item = data.get(position);
                intent.putExtra("data", data);
                intent.putExtra("name", item.getName());
                intent.putExtra("position", position);
                startActivity(intent);

            }
        });

    }


    public void methods() {


    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}

