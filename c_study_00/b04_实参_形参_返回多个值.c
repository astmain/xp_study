#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

//ָ��ı�ֵ
//С�ܽ᣺ͨ�����������޸�����������ͨ������ֵ  
//1.ʵ�α�������ͨ�����ĵ�ַ   ---&a1(ʵ��)
//2.�βα�����ָ�����        ---*a1(�β�)
//3.����������ͨ���޸�*a1�β����ķ�ʽ�޸�����������ر�����ֵ

void func1_����ָ���ַӰ�����Ʒ���ֵ_�ĺù�����Ƿ���ֵ(int* a1, int* b1) {
	int temp = *a1;
	*a1 = *b1;
	*b1 = temp;
	printf("func1---a1---%d\n", a1);
	printf("func1---b1---%d\n", b1);
	printf("func1---a1---%d\n", *a1);
	printf("func1---b1---%d\n", *b1);
}


int b04_ʵ��_�β�_���ض��ֵ() {
	int a1 = 100;
	int b1 = 200;
	printf("func1==========================================\n");
	func1_����ָ���ַӰ�����Ʒ���ֵ_�ĺù�����Ƿ���ֵ(&a1, &b1);
	printf("main---a1---%d\n", a1);
	printf("main---b1---%d\n", b1);

	return 0;
}

