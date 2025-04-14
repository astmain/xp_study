package com.xupeng.myapplication;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.view.View;
import android.widget.SeekBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.xupeng.myapplication.Tool.__;
import com.xupeng.myapplication.adapter.Song;

import static cn.hutool.core.lang.Console.log;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Timer;
import java.util.TimerTask;

public class song_play extends AppCompatActivity {
    String TAG = "ME---";//logcat设置package:mine ME
    song_service.My_binder my_binder_song;
    boolean seekBar_is_drag = false;
    Timer timer;
    String play_mode_curr = "单曲循环";
    // 定义一个前台serviceld
    public static final int FOREGROUND_ID = 1;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.song_play);
        init_song_service();





    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        //注销定时器
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
    }


    ////按下返回键，程序退到保活到后台,但是不能再回到MainActivy
    //@Override
    //public void onBackPressed() {
    //    moveTaskToBack(true);
    //}


    void init_song_service() {
        //音乐拂去获取页面跳转的数据
        var name = getIntent().getStringExtra("name");
        var position = getIntent().getIntExtra("position", 0);
        var data = (ArrayList<Song>) getIntent().getSerializableExtra("data");
        log(TAG, "name", name);
        log(TAG, "position", position);
        log(TAG, "data", data);

        //当前播放的音乐名称
        SeekBar seekBar = findViewById(R.id.seekBar);
        TextView tv_curr_song = findViewById(R.id.tv_curr_song);
        TextView tv_time_curr = findViewById(R.id.tv_time_curr);
        TextView tv_time_duration = findViewById(R.id.tv_time_duration);
        tv_curr_song.setText(name);


        //音乐服务连接
        var conn = new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
                log(TAG, "conn---onServiceConnected:");
                my_binder_song = ((song_service.My_binder) iBinder);
                my_binder_song.my_update_data(data);
                my_binder_song.my_update_position(position);

                //ui设置当前时间和总时间
                tv_time_curr.setText(__.time_mill_to_minute_second(my_binder_song.my_get_curr_time()));
                tv_time_duration.setText(__.time_mill_to_minute_second(my_binder_song.my_get_duration()));

                my_binder_song.my_set_song_service_listener(new song_service_listener() {
                    @Override
                    public void on_change(int index) {
                        String song_name = my_binder_song.my_get_curr_song();
                        tv_curr_song.setText(song_name);
                    }
                });

                //进度条监听时间
                seekBar.setMax(my_binder_song.my_get_duration() - 1);
                seekBar.setProgress(my_binder_song.my_get_curr_time());
                if (timer != null) return;
                timer = new Timer();
                timer.schedule(new TimerTask() {
                    @Override
                    public void run() {
                        if (!seekBar_is_drag && my_binder_song.my_is_play()) {
                            tv_time_curr.setText(__.time_mill_to_minute_second(my_binder_song.my_get_curr_time()));
                            seekBar.setProgress(my_binder_song.my_get_curr_time());
                            //tv_curr_song.setText(my_binder_song.my_get_curr_song());//更新当前播放的音乐名称
                        }
                    }
                }, 0, 200);


                //进度条拖动事件
                seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {

                    @Override
                    public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                        //my_binder_song.mediaPlayer.seekTo(i);
                        //my_binder_song.my_seekTo(i);
                        tv_time_curr.setText(__.time_mill_to_minute_second(my_binder_song.my_get_curr_time()));
                    }

                    @Override
                    public void onStartTrackingTouch(SeekBar seekBar) {
                        seekBar_is_drag = true;
                    }

                    @Override
                    public void onStopTrackingTouch(SeekBar seekBar) {
                        seekBar_is_drag = false;
                        int time = seekBar.getProgress();
                        my_binder_song.my_seekTo(time);
                    }
                });


            }

            @Override
            public void onServiceDisconnected(ComponentName componentName) {
                log(TAG, "conn---onServiceDisconnected: ");
            }
        };
        // 音乐服务绑定启动                           //同时使用bind,start的方式启动service
        Intent intent = new Intent(this, song_service.class);
        bindService(intent, conn, BIND_AUTO_CREATE);//通过 bind 的形式启动 service
        startService(intent);                       //通过 start的方式启动


        //音乐按钮播放暂停
        TextView tv_play_or_pause = findViewById(R.id.tv_play_or_pause);
        tv_play_or_pause.setOnClickListener(v -> {
            if (my_binder_song.my_is_play()) {
                my_binder_song.my_pause();
                tv_play_or_pause.setText("■");
            } else {
                my_binder_song.my_play();
                tv_play_or_pause.setText("▶");
                my_binder_song.my_set_paly_mode(play_mode_curr);

                my_binder_song.my_notification_create();
            }
        });

        //音乐按钮上一曲
        TextView tv_play_previous = findViewById(R.id.tv_play_previous);
        tv_play_previous.setOnClickListener(v -> {
            my_binder_song.my_previous();
            tv_curr_song.setText(my_binder_song.my_get_curr_song());//更新当前播放的音乐名称
        });


        //音乐按钮下一曲
        TextView tv_play_next = findViewById(R.id.tv_play_next);
        tv_play_next.setOnClickListener(v -> {
            my_binder_song.my_previous();
            tv_curr_song.setText(my_binder_song.my_get_curr_song());//更新当前播放的音乐名称
        });

        //音乐重置
        TextView tv_play_stop = findViewById(R.id.tv_play_stop);
        tv_play_stop.setOnClickListener(v -> {
            seekBar_is_drag = false;
            my_binder_song.my_stop();
            seekBar.setProgress(0);
            tv_play_or_pause.setText("■");
            tv_time_curr.setText("00:00");
        });

        //音乐播放模式
        TextView tv_play_mode = findViewById(R.id.tv_play_mode);
        tv_play_mode.setOnClickListener(v -> {
            log("tv_play_mode---111---play_mode_curr", play_mode_curr);
            if (play_mode_curr == "单曲循环") {
                play_mode_curr = "顺序播放";
            } else if (play_mode_curr == "顺序播放") {
                play_mode_curr = "随机播放";
            } else if (play_mode_curr == "随机播放") {
                play_mode_curr = "单曲循环";
            }
            my_binder_song.my_set_paly_mode(play_mode_curr);
            tv_play_mode.setText(play_mode_curr);
            log("tv_play_mode---222---play_mode_curr", play_mode_curr);

        });

    }


}
