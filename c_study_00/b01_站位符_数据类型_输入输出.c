#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h> 
#include <stdlib.h> 

int b01_站位符_数据类型_输入输出() {
	int size_int = sizeof(int);
	printf("int---类型的长度为---%d\n", size_int);
	printf("chart---类型的长度为---%d\n", sizeof(char));
	printf("float---类型的长度为---%d\n", sizeof(float));
	printf("double---类型的长度为---%d\n", sizeof(double));
	printf("long---类型的长度为---%d\n", sizeof(long));
	printf("short---类型的长度为---%d\n", sizeof(short));
	printf("signed---类型的长度为---%d\n", sizeof(signed));

	if (-1) {
		printf("我是(-1)表式true\n");
	}

	if (0) {

	}
	else {
		printf("我是(0)false\n");
	}

	if (1) {
		printf("111\n");
	}
	else {
		printf("222\n");
	}

	//输出函数 =====================================================================================
	float f = 3.14159265;
	double d = 3.14159265;
	printf("f----%f\n", f);//
	printf("4f----%.4f\n", f);
	printf("lf----%lf\n", d);
	printf("10lf----%.10lf\n", d);


	int i = 12345678;
	printf("hd----%hd\n", i);
	//24910     
	//0001 0010 0011 0100 0101 0110 0111 1000
	//               0010 0011 1001 0001 0000
// 
	//不同的类型 要用不同的占位符  ,就需要再百分号后面加上" .数字" 

	char cArray[] = { 'A','B' };
	printf("cArray内存地址==%x\n", &cArray);//62fe00
	printf("cArray内存地址==%#x\n", &cArray);//0x62fe00
	printf("cArray内容---%s\n", &cArray);

	char* text = "I love you";
	printf("text内存地址---%s\n", &text);//SA@
	printf("text内容---%s\n", text);//I love you

	////输入函数 ==============================================================
	int i1;
	printf("亲请输入一个你认为最帅的数字:\n");
	scanf("%d", &i);
	//printf("您输入的数字时---%d\n", i);

	char carray2[] = { 'H','E','L','L','O' };
	int j;
	for (j = 0; j < 5; j++) {
		printf("---%c\n", carray2[j]);
	}
	printf("---%s\n", carray2);


	system("pause");//暂停
	return 0;
}



/*
c语言基本类型
char
int
float
double
long
short
signed
unsigned
void
C语言没有boolean,byte


int---类型的长度为---4
chart---类型的长度为---1
float---类型的长度为---4
double---类型的长度为---8
long---类型的长度为---4
short---类型的长度为---2
signed---类型的长度为---4



%d      int
#ld     long int
%c      char
%f      float
%u     无符号
%hd     短类型
%lf     double
%x     十六进制输出int  或者 long int 或者 short 
#%x    进制
%o     八进制
%s     字符串

*/