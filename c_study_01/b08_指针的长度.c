#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
//32 λϵͳ��32 λ�Ĳ���ϵͳ�У���ַ���߿���� 32 λ������ζ��ϵͳ�ܹ�ʹ�õ�����ڴ��ַ��Χ��\(2 ^ {32}\)����ͬ�ĵ�ַ��Ϊ�˱�ʾ��Щ��ַ��ָ�������Ҫ 32 λ��Ҳ���� 4 �ֽڣ��Ĵ洢�ռ䡣������ 32 λϵͳ�У��κ����͵�ָ�루��int * ��char * �ȣ����ȶ��� 4 �ֽڡ�
//64 λϵͳ��64 λ����ϵͳ�ĵ�ַ���߿��Ϊ 64 λ�������Ա�ʾ������ڴ��ַ��Χ�ﵽ\(2 ^ {64}\)����ͬ�ĵ�ַ����ˣ�ָ�������Ҫ 64 λ���� 8 �ֽڣ��Ĵ洢�ռ����洢��Щ��ַ�������� 64 λϵͳ�У�ָ�볤��ͨ���� 8 �ֽڡ�

int b08_ָ��ĳ���() {
	// ����һ��ָ�����
	void* ptr;
	// ��ȡָ������Ĵ�С
	size_t pointer_size = sizeof(ptr);

	if (pointer_size == 4) {
		printf("��ǰ����ϵͳ��32λ��\n");
	} else if (pointer_size == 8) {
		printf("��ǰ����ϵͳ��64λ��\n");
	} else {
		printf("�޷�ȷ������ϵͳλ����\n");
	}



	int* iPoint;//Ϊʲô�ҵõ��Ľ��ָ��ĳ�����8   ,���˵���4
	char* cPoint;
	printf("iPoint---%d\n", sizeof(iPoint));
	printf("iPoint---%d\n", sizeof(cPoint));


	//����3��c�����ļ�
	//main.c
	//test1.c
  //test2.c
	//�����main.c�е���test1.c,test1.c�еĺ���



	return 0;
}