package com.xupeng.myapplication.adapter;

import java.io.Serializable;

public class Song implements Serializable {

    private String name;

    public Song() {

    }

    public String name() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {


        return this.name;
    }

    public Song(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Song{" + "name='" + name + '\'' + '}';
    }
}
