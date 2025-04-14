package com.xupeng.myapplication.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import static cn.hutool.core.lang.Console.log;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.xupeng.myapplication.R;

import java.util.ArrayList;

public class Adapter_Song extends RecyclerView.Adapter<Adapter_Song.My_item_view_holder> {
    String TAG = "ME---";//logcat设置package:mine ME
    private Context mContext;
    private ArrayList<Song> rcv_data;//数据源
    private My_interface_click my_interface_click;//接口点击回调


    //构造方法======================================================================
    public Adapter_Song(Context mContext, ArrayList<Song> rcv_data) {
        this.mContext = mContext;
        this.rcv_data = rcv_data;
    }

    //重写方法======================================================================
    @NonNull
    @Override//onCreateViewHolder
    public My_item_view_holder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(mContext).inflate(R.layout.song_item, parent, false);//找到布局item
        return new My_item_view_holder(itemView);
    }

    @Override//onBindViewHolder
    public void onBindViewHolder(@NonNull My_item_view_holder view_holder, int position) {
        Song item = rcv_data.get(position);
        view_holder.bind_data(item);

    }

    @Override//getItemCount
    public int getItemCount() {
        return rcv_data == null ? 0 : rcv_data.size();//数据源大小
    }


    class My_item_view_holder extends RecyclerView.ViewHolder {
        private TextView tv1;
        private LinearLayout container;

        public My_item_view_holder(@NonNull View itemView) {
            super(itemView);
            tv1 = itemView.findViewById(R.id.tv_song_name);
            container = itemView.findViewById(R.id.ll_song_container);
            container.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    log(TAG, "111---点击了item");
                    if (my_interface_click != null) {
                        log(TAG, "222---点击了item");
                        my_interface_click.my_click(getAdapterPosition());
                    }
                }
            });


        }

        //绑定数据
        public void bind_data(Song item) {
            tv1.setText(item.getName());
        }


    }

    //接口=====================================================
    public interface My_interface_click {
        public void my_click(int position);
    }


    //接口方法
    public void set_item_click(My_interface_click my_interface_click) {
        this.my_interface_click = my_interface_click;
    }


}
