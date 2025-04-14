#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
void func1(int** address) {
	int i = 100;
	int* temp;
	temp = malloc(sizeof(int));    //malloc(int)-内存地址
	*temp = i;                     //把i对应的值，赋值给 temp地址对应的值
	*address = temp;
	free(temp);                    //回收后,就变成了野指针
}

int b09_动态内存分配() {
	int* iPoint;                  //定义int类型的一级指针变量 iPoint
	func1(&iPoint);
	printf("*iPoint---指针---%d\n", *iPoint);
	printf("*iPoint---指针---%d\n", *iPoint);
	printf("*iPoint---指针---%d\n", *iPoint);

	return 0;
}