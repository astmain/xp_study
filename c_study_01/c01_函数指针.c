
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

int add(int a1, int a2) {
	return a1 + a2;
}

int c01_函数指针() {
	//定义函数指针
	int (*func_p_add)(int x, int y);

	//关联
	func_p_add = add;

	//调用
	int result = func_p_add(111, 222);

	//结果
	printf("result---%d\n", result);
	return 0;
}

