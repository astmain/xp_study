#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

//ָ��ı�ֵ
//С�ܽ᣺ͨ�����������޸�����������ͨ������ֵ  
//1.ʵ�α�������ͨ�����ĵ�ַ   ---&a1(ʵ��)
//2.�βα�����ָ�����        ---*a1(�β�)
//3.����������ͨ���޸�*a1�β����ķ�ʽ�޸�����������ر�����ֵ



/*

�༶ָ��
ָ��ָ������ڴ��ַ
��ַ����ָ��
*/

int b06_����_ָ��ȡֵ() {
	char cArr[] = { 'A','B' };
	int iArr[] = { 100,200 };
	printf("cArr[0]---%c\n", cArr[0]);
	printf("iArr[0]---%d\n", iArr[0]);

	printf("��ϵ���ڴ��ַ===============================\n");
	printf("cArr[0]��ַ---%#x\n", &cArr[0]);
	printf("cArr[1]��ַ---%#x\n", &cArr[1]);
	printf("iArr[0]��ַ---%#x\n", &iArr[0]);
	printf("iArr[1]��ַ---%#x\n", &iArr[1]);


	printf("������׵�ַ===============================\n");
	printf("cArr�׵�ַ---%#x\n", &cArr);
	printf("cArr[0]��ַ---%#x\n", &cArr[0]);

	printf("��ָ��ȡֵ===============================\n");
	printf("*cArr---%c\n", *cArr);
	printf("*cArr+1---%c\n", *cArr + 1);

	printf("*iArr---%d\n", *iArr);
	printf("*iArr+1---%d\n", *iArr + 1);

	printf("������ָ��ȡֵ===============================\n");
	printf("*(iArr+0)---%d\n", *(iArr + 0));
	printf("*(iArr + 1)---%d\n", *(iArr + 1));


	return 0;
}

