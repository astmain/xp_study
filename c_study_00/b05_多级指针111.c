#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

//指针改变值
//小总结：通过被调函数修改主调函数普通变量的值  
//1.实参必须是普通变量的地址   ---&a1(实参)
//2.形参必须是指针变量        ---*a1(形参)
//3.被掉函数中通过修改*a1形参名的方式修改主调函数相关变量的值


//多级指针
//指针指向的是内存地址
//地址就是指针
int b05_多级指针111() {
	int a1 = 100;                 //定义一个int类型的变量i,并且赋值为100
	int* addressPoint1 = &a1;                 //1级指针   定义一个int类型的一级指针变量address1，并且把i的地址赋值给它
	int** addressPoint2 = &addressPoint1;     //2级指针 
	int*** addressPoint3 = &addressPoint2;    //3级指针 
	int**** addressPoint4 = &addressPoint3;   //4级指针 


	//多级指针取值****addressPoint4得到的值是100
	printf("****addressPoint4---%d\n", ****addressPoint4);
	printf("****addressPoint4---%d\n", ***addressPoint4);
	printf("****addressPoint4---%x\n", ***addressPoint4);
	return 0;
}
