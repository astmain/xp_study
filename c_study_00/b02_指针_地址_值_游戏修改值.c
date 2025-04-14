#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

//  指针就是内存地址
//  内地地址就是指针
int b02_指针_地址_值_游戏修改值() {
	int size_int = sizeof(int);
	printf("000---size_int---%d\n", size_int);

	int i = 10; 	                // 定义一个int类型的变量i，并且赋值为10
	int* p;                         // 定义一个int类型的一级指针变量p
	p = &i;                         // 把i对应的地址赋值给p变量
	printf("111---*p---%d\n", *p);  // 指针取值*p ：把p变量对应的地址的值取出来

	//指针取值*p :把p变量对应的地址的值取出来
	printf("222---*p===%d\n", *p);
	*p = 100;//赋值
	printf("333---*p===%d\n", *p);
	printf("444---i===%d\n", i);

	printf("开始游戏============================\n");
	int index;
	for (index = 1000; index > 0; index--) {
		Sleep(5000);
		printf("---还剩下多少秒---index==%d\n", index);
	}
	printf("恭喜大哥,你真厉害\n");

	system("pause");//暂停
	return 0;
}
