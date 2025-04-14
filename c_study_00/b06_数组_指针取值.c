#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

//指针改变值
//小总结：通过被调函数修改主调函数普通变量的值  
//1.实参必须是普通变量的地址   ---&a1(实参)
//2.形参必须是指针变量        ---*a1(形参)
//3.被掉函数中通过修改*a1形参名的方式修改主调函数相关变量的值



/*

多级指针
指针指向的是内存地址
地址就是指针
*/

int b06_数组_指针取值() {
	char cArr[] = { 'A','B' };
	int iArr[] = { 100,200 };
	printf("cArr[0]---%c\n", cArr[0]);
	printf("iArr[0]---%d\n", iArr[0]);

	printf("联系的内存地址===============================\n");
	printf("cArr[0]地址---%#x\n", &cArr[0]);
	printf("cArr[1]地址---%#x\n", &cArr[1]);
	printf("iArr[0]地址---%#x\n", &iArr[0]);
	printf("iArr[1]地址---%#x\n", &iArr[1]);


	printf("数组的首地址===============================\n");
	printf("cArr首地址---%#x\n", &cArr);
	printf("cArr[0]地址---%#x\n", &cArr[0]);

	printf("用指针取值===============================\n");
	printf("*cArr---%c\n", *cArr);
	printf("*cArr+1---%c\n", *cArr + 1);

	printf("*iArr---%d\n", *iArr);
	printf("*iArr+1---%d\n", *iArr + 1);

	printf("正规用指针取值===============================\n");
	printf("*(iArr+0)---%d\n", *(iArr + 0));
	printf("*(iArr + 1)---%d\n", *(iArr + 1));


	return 0;
}

