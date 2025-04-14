package com.xupeng.tools;

public class desc {
    public static void run(Object... args) {
        String str1 = "";
        for (int i = 0; i < args.length; i++) {
            String ele = args[i].toString();
            if (i == 0) {
                str1 = str1 + ele;
            } else {
                str1 = str1 + ele + "  ";
            }


        }


        str1 = "\33[36m说明:" + str1 + "========================\33[0m";


        System.out.println(str1);


    }
}
