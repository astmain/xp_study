#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

//  ָ������ڴ��ַ
//  �ڵص�ַ����ָ��
int b02_ָ��_��ַ_ֵ_��Ϸ�޸�ֵ() {
	int size_int = sizeof(int);
	printf("000---size_int---%d\n", size_int);

	int i = 10; 	                // ����һ��int���͵ı���i�����Ҹ�ֵΪ10
	int* p;                         // ����һ��int���͵�һ��ָ�����p
	p = &i;                         // ��i��Ӧ�ĵ�ַ��ֵ��p����
	printf("111---*p---%d\n", *p);  // ָ��ȡֵ*p ����p������Ӧ�ĵ�ַ��ֵȡ����

	//ָ��ȡֵ*p :��p������Ӧ�ĵ�ַ��ֵȡ����
	printf("222---*p===%d\n", *p);
	*p = 100;//��ֵ
	printf("333---*p===%d\n", *p);
	printf("444---i===%d\n", i);

	printf("��ʼ��Ϸ============================\n");
	int index;
	for (index = 1000; index > 0; index--) {
		Sleep(5000);
		printf("---��ʣ�¶�����---index==%d\n", index);
	}
	printf("��ϲ���,��������\n");

	system("pause");//��ͣ
	return 0;
}
