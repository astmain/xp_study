#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

//指针改变值
//小总结：通过被调函数修改主调函数普通变量的值  
//1.实参必须是普通变量的地址   ---&a1(实参)
//2.形参必须是指针变量        ---*a1(形参)
//3.被掉函数中通过修改*a1形参名的方式修改主调函数相关变量的值

void func1_利用指针地址影响类似返回值_改好过后就是返回值(int* a1, int* b1) {
	int temp = *a1;
	*a1 = *b1;
	*b1 = temp;
	printf("func1---a1---%d\n", a1);
	printf("func1---b1---%d\n", b1);
	printf("func1---a1---%d\n", *a1);
	printf("func1---b1---%d\n", *b1);
}


int b04_实参_形参_返回多个值() {
	int a1 = 100;
	int b1 = 200;
	printf("func1==========================================\n");
	func1_利用指针地址影响类似返回值_改好过后就是返回值(&a1, &b1);
	printf("main---a1---%d\n", a1);
	printf("main---b1---%d\n", b1);

	return 0;
}

