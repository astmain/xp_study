package com.xupeng.myapplication.Tool;

public class time_mill_to_minute_second {


    public static String run(long mill) {
        long totalSeconds = mill / 1000;
        long minute = totalSeconds / 60;
        long second = totalSeconds % 60;
        return String.format("%d:%02d", minute, second);
    }
}
