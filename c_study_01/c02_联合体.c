#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

union Value {
	int i;
	long l;
	char c;
};

//������,���е��ֶζ���ʹ��ͬһ���ڴ�ռ䣺
int c02_������() {
	/*printf("Mix---����---%zu\n", sizeof(union data));*/
	printf("Value---����---%d\n", sizeof(union Value));

	union Value val;
	val.i = 111;
	val.l = 222;
	val.c = 'A';

	printf("val.i---%d\n", val.i);
	printf("val.l---%d\n", val.l);
	printf("val.c = %c\n", val.c);

	return 0;
}
