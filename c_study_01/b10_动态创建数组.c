
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
int b10_��̬��������() {
	printf("��������Ҫ��������ĳ���\n");
	//����
	int len;
	scanf("%d", &len);
	printf("������ĳ���Ϊ---%d\n", len);


	//�����ڴ�ռ�
	int* iArr = (int*)malloc(len * 4);             // ��̬�����ڴ�

	//��ֵ
	int i;
	for (i = 0; i < len; i++) {
		printf("������iArr[%d]��ֵ---\n", i);
		scanf("%d", iArr + i);
	}

	//��������������չ����
	printf("��������Ҫ��������ĳ���");
	int len_extend;
	scanf("%d", &len_extend);
	printf("���������չ����Ϊ---%d\n", len_extend);

	//���·����ڴ�ռ�
	iArr = realloc(iArr, (len + len_extend) * 4);
	//��ֵ
	for (i = len; i < len + len_extend; i++) {
		printf("������iArr[%d]��ֵ---\n", i);
		scanf("%d", iArr + i);
	}

	//���
	printf("���\n");
	for (i = 0; i < len + len_extend; i++) {
		printf("������iArr[%d]��ֵ---%d\n", i, *(iArr + i));
	}

	return 0;
}

