package com.xupeng.myapplication.Tool;

import android.util.Log;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class ajax_get {
    private static final OkHttpClient client = new OkHttpClient();


    public static String run(String url) {
        //MediaType mediaType = MediaType.get("application/json; charset=utf-8");
        MediaType mediaType = MediaType.get("application/json; charset=utf-8");
        Request request = new Request.Builder().url(url).build();


        CompletableFuture<String> future = new CompletableFuture<>();


        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e("OkHttp", "请求失败: " + e.getMessage());
                future.completeExceptionally(e);
            }


            @Override
            public void onResponse(Call call, Response response) {
                try {
                    if (response.isSuccessful()) {
                        JSONObject json_obj = JSONUtil.createObj();
                        json_obj.set("msg", "成功:网络请求");
                        json_obj.set("code", response.code());
                        json_obj.set("data", JSONUtil.parseObj(response.body().string()));
                        json_obj.set("error", "");

                        String result = JSONUtil.toJsonStr(json_obj);
                        future.complete(result);
                    } else {
                        JSONObject json_obj = JSONUtil.createObj();
                        json_obj.set("msg", "失败:网络请求");
                        json_obj.set("code", response.code());
                        json_obj.set("data", JSONUtil.parseObj(response.body().string()));
                        json_obj.set("error", "");
                        String result = JSONUtil.toJsonStr(json_obj);
                        future.complete(result);
                    }
                } catch (
                        Exception error) {
                    //Log.e("OkHttp", "响应处理异常: " + error.getMessage());
                    JSONObject json_obj = JSONUtil.createObj();
                    json_obj.set("msg", "失败:响应处理异常");
                    json_obj.set("code", 404);
                    json_obj.set("data", "{}");
                    json_obj.set("error", error.getMessage());
                    String result = JSONUtil.toJsonStr(json_obj);
                    future.complete(result);
                }
            }
        });


        try {
            return future.get();
        } catch (Exception error) {
            //Log.e("OkHttp", "获取结果异常: " + error.getMessage());
            JSONObject json_obj = JSONUtil.createObj();
            json_obj.set("msg", "失败:获取结果异常");
            json_obj.set("code", 404);
            json_obj.set("data", "{}");
            json_obj.set("error", error.getMessage());
            String result = JSONUtil.toJsonStr(json_obj);
            return result;
        }
    }
}