package com.xupeng.myapplication;

import static cn.hutool.core.lang.Console.log;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.AssetFileDescriptor;
import android.content.res.AssetManager;
import android.graphics.BitmapFactory;
import android.media.MediaPlayer;
import android.os.Binder;
import android.os.IBinder;
import android.widget.RemoteViews;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.xupeng.myapplication.adapter.Song;

import java.io.IOException;
import java.util.ArrayList;

public class song_service extends Service {
    String TAG = "ME---";//logcat设置package:mine ME
    ArrayList<Song> data222;
    private MediaPlayer mediaPlayer = new MediaPlayer();
    private int curr_index = 0;
    private String paly_mode = "单曲循环";
    private song_service_listener m_song_service_listener;
    private static final String CHANNEL_ID = "song_lay_channel";
    private boolean is_notification = false;
    public BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            log(TAG, "收到:222---", "动态广播");
            if (intent != null) {
                //Bundle extras = intent.getExtras();
                //var val=extras.getString("key");
                String value = intent.getStringExtra("key");
                log(TAG, "收到:222---", value);
                if (value.equals("下一曲")) {
                    next();
                    m_song_service_listener.on_change(curr_index);
                }
            }
        }

    };

    @Override
    public void onCreate() {
        super.onCreate();

        mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mp) {
                log(TAG, "onCompletion");
                if (paly_mode.equals("顺序播放")) {
                    next();
                    m_song_service_listener.on_change(curr_index);
                }

                if (paly_mode.equals("单曲循环")) {
                    try {
                        set_paly_index(curr_index);
                        m_song_service_listener.on_change(curr_index);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
                if (paly_mode.equals("随机播放")) {
                    try {
                        int rand_index = (int) (Math.random() * data222.size());
                        set_paly_index(rand_index);
                        m_song_service_listener.on_change(curr_index);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        });
        notification_registerReceiver();
        log(TAG, "onCreate");

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        log(TAG, "onStartCommand");
        //create_notification();
        return super.onStartCommand(intent, flags, startId);
    }

    //动态广播注册
    public void notification_registerReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("MY_broadcast_dynamic");
        //intentFilter.setPriority(1000);//优先级-有序广播
        registerReceiver(broadcastReceiver, intentFilter);
        log(TAG, "动态广播1_注册---");

    }


    public void notification_create() {
        if (is_notification) return;
        // 通知管理器
        NotificationManager notificationManager = (NotificationManager) getSystemService(Service.NOTIFICATION_SERVICE);

        // 通知渠道（适用于 Android 8.0 及以上版本）
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "音乐播放器通知", notificationManager.IMPORTANCE_DEFAULT);//通知的重要性,友没有声音,弹框
            channel.setDescription("音乐播放器通知描述");
            notificationManager.createNotificationChannel(channel);
        }

        // 通知栏设置歌曲名
        RemoteViews song_notication = new RemoteViews(getPackageName(), R.layout.song_notication);
        song_notication.setTextViewText(R.id.tv2_name, data222.get(curr_index).getName());


        // 通知栏发送广播
        //Intent intent_next = new Intent("tv2_right");
        Intent intent_next = new Intent().setAction("MY_broadcast_dynamic").putExtra("key", "下一曲");
        PendingIntent pendingIntent_next = PendingIntent.getBroadcast(this, '0', intent_next, 0);
        song_notication.setOnClickPendingIntent(R.id.tv2_right, pendingIntent_next);


        // 构建通知
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("音乐内容")
                .setContentText("音乐标题")
                .setSmallIcon(R.drawable.baseline_music_note_24)
                .setCustomContentView(song_notication)
                //.setContent(startSongPlayPendIntent)
                .setLargeIcon(BitmapFactory.decodeResource(getResources(), R.drawable.ic_launcher_foreground)).build();


        startForeground(1, notification);
        is_notification = true;
        log(TAG, "222---create_notification");
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        log(TAG, "onBind");
        return new My_binder(this);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        log(TAG, "onDestroy");
        if (mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.release();
        }

    }


    //更新数据_播放列表数据
    void update_data(ArrayList<Song> data) {
        log(TAG, "my_update_data---data", data);
        this.data222 = data;

    }

    //更新位置_播放音乐
    void update_position(int position) {
        curr_index = position;
        var song = data222.get(curr_index);
        log(TAG, "my_update_position---song", curr_index, song);

        //重置一下播放
        mediaPlayer.stop();
        mediaPlayer.reset();

        //再进行播放
        try {
            AssetManager assets = getAssets();
            AssetFileDescriptor assetFileDescriptor = assets.openFd(song.getName());
            mediaPlayer.setDataSource(assetFileDescriptor.getFileDescriptor(), assetFileDescriptor.getStartOffset(), assetFileDescriptor.getLength());
            mediaPlayer.prepare();
            mediaPlayer.start();

            //assetFileDescriptor.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //是否正在播放
    boolean is_play() {
        boolean bool = mediaPlayer.isPlaying();
        return bool;
    }

    //播放
    void play() {
        if (is_play() == false) mediaPlayer.start();
    }

    //暂停
    void pause() {
        if (is_play() == true) mediaPlayer.pause();
    }

    //上一曲
    void previous() {
        int pre_index = curr_index - 1;
        if (pre_index < 0) {
            pre_index = data222.size() - 1;
        }
        update_position(pre_index);
    }

    //下一曲
    void next() {
        int next_index = curr_index + 1;
        if (next_index > data222.size() - 1) {
            next_index = 0;
        }
        update_position(next_index);
    }

    //停止
    void stop() {
        try {
            mediaPlayer.stop();
            mediaPlayer.prepare();//预备好
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    int get_curr_time() {
        int curr_time = mediaPlayer.getCurrentPosition();
        //log(TAG, "get_curr_time---", curr_time);
        return curr_time;
    }

    int get_duration() {
        //
        return mediaPlayer.getDuration();
    }


    String get_curr_song() {
        //
        return data222.get(curr_index).getName();
    }

    void seekTo(int time) {
        mediaPlayer.seekTo(time);
    }


    public void set_paly_mode(String mode) {
        paly_mode = mode;
    }

    public void set_paly_index(int index) throws IOException {
        try {
            curr_index = index;
            var song = data222.get(index);
            mediaPlayer.stop();
            mediaPlayer.reset();
            AssetManager assets = getAssets();
            AssetFileDescriptor assetFileDescriptor = assets.openFd(song.getName());
            mediaPlayer.setDataSource(assetFileDescriptor.getFileDescriptor(), assetFileDescriptor.getStartOffset(), assetFileDescriptor.getLength());
            mediaPlayer.prepare();
            mediaPlayer.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void set_song_service_listener(song_service_listener listener) {
        this.m_song_service_listener = listener;
    }


    //中间人========================================================
    public class My_binder extends Binder {
        private song_service service;

        public My_binder(song_service service) {
            service = service;
        }

        public void my_update_data(ArrayList<Song> data) {
            //log(TAG, "data---", data);
            update_data(data);

        }

        public void my_update_position(int position) {
            //log(TAG, "position---", position);
            update_position(position);
        }

        public boolean my_is_play() {
            boolean bool = is_play();
            return bool;
        }


        public void my_pause() {
            pause();
        }

        public void my_play() {
            play();
        }

        public void my_previous() {
            previous();
        }

        public void my_nest() {
            next();
        }

        public void my_stop() {
            stop();
        }

        public String my_get_curr_song() {
            return get_curr_song();
        }


        public int my_get_curr_time() {
            return get_curr_time();
        }

        public int my_get_duration() {
            return get_duration();
        }


        public void my_seekTo(int time) {
            seekTo(time);
        }

        public void my_set_paly_mode(String mode) {
            set_paly_mode(mode);
        }

        public void my_set_song_service_listener(song_service_listener listener) {
            set_song_service_listener(listener);
        }

        public void my_notification_create() {
            log(TAG, "111---my_create_notification");
            notification_create();
        }
    }


}


