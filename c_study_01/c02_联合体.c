#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

union Value {
	int i;
	long l;
	char c;
};

//联合体,所有的字段都是使用同一块内存空间：
int c02_联合体() {
	/*printf("Mix---长度---%zu\n", sizeof(union data));*/
	printf("Value---长度---%d\n", sizeof(union Value));

	union Value val;
	val.i = 111;
	val.l = 222;
	val.c = 'A';

	printf("val.i---%d\n", val.i);
	printf("val.l---%d\n", val.l);
	printf("val.c = %c\n", val.c);

	return 0;
}
