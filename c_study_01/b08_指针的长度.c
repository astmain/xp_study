#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
//32 位系统：32 位的操作系统中，地址总线宽度是 32 位，这意味着系统能够使用的最大内存地址范围是\(2 ^ {32}\)个不同的地址。为了表示这些地址，指针变量需要 32 位（也就是 4 字节）的存储空间。所以在 32 位系统中，任何类型的指针（如int * 、char * 等）长度都是 4 字节。
//64 位系统：64 位操作系统的地址总线宽度为 64 位，它可以表示的最大内存地址范围达到\(2 ^ {64}\)个不同的地址。因此，指针变量需要 64 位（即 8 字节）的存储空间来存储这些地址。所以在 64 位系统中，指针长度通常是 8 字节。

int b08_指针的长度() {
	// 定义一个指针变量
	void* ptr;
	// 获取指针变量的大小
	size_t pointer_size = sizeof(ptr);

	if (pointer_size == 4) {
		printf("当前操作系统是32位。\n");
	} else if (pointer_size == 8) {
		printf("当前操作系统是64位。\n");
	} else {
		printf("无法确定操作系统位数。\n");
	}



	int* iPoint;//为什么我得到的结果指针的长度是8   ,别人的是4
	char* cPoint;
	printf("iPoint---%d\n", sizeof(iPoint));
	printf("iPoint---%d\n", sizeof(cPoint));


	//我有3个c语言文件
	//main.c
	//test1.c
  //test2.c
	//如何再main.c中调用test1.c,test1.c中的函数



	return 0;
}