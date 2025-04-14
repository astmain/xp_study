#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>


int b07_数组_输入() {
    printf("请输入数组长度\n");
    int length;
    scanf("%d", &length);
    printf("您输入的数组长度为---%d\n", length);
    //int iArr[length];在 C 语言里， 这种写法属于可变长度数组（VLA），它是 C99 标准引入的特性。要是你的编译器不支持 C99 或者更高的标准，就无法识别可变长度数组，进而报错。
    int* iArr = (int*)malloc(length * sizeof(int)); // 动态分配内存
    if (iArr == NULL) {
        printf("内存分配失败\n");
        return 1;
    }
    int i;
    for (i = 0; i < length; i++) {
        printf("请输入iArr[%d]的值\n", i);
        //scanf("%d", &iArr[i]);//利用索引取值
        scanf("%d", iArr+i);  //利用数组指针取值
    }
    printf("结果=========================\n");
    for (i = 0; i < length; i++) {
        printf("iArr[%d]的值为---%d\n", i, iArr[i]);
    }
    free(iArr); // 释放内存
    return 0;
}