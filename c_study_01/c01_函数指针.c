
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

int add(int a1, int a2) {
	return a1 + a2;
}

int c01_����ָ��() {
	//���庯��ָ��
	int (*func_p_add)(int x, int y);

	//����
	func_p_add = add;

	//����
	int result = func_p_add(111, 222);

	//���
	printf("result---%d\n", result);
	return 0;
}

