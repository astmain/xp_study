#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
void func1(int** address) {
	int i = 100;
	int* temp;
	temp = malloc(sizeof(int));    //malloc(int)-�ڴ��ַ
	*temp = i;                     //��i��Ӧ��ֵ����ֵ�� temp��ַ��Ӧ��ֵ
	*address = temp;
	free(temp);                    //���պ�,�ͱ����Ұָ��
}

int b09_��̬�ڴ����() {
	int* iPoint;                  //����int���͵�һ��ָ����� iPoint
	func1(&iPoint);
	printf("*iPoint---ָ��---%d\n", *iPoint);
	printf("*iPoint---ָ��---%d\n", *iPoint);
	printf("*iPoint---ָ��---%d\n", *iPoint);

	return 0;
}