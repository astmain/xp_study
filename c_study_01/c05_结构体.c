#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
struct Student {
	int id;
	char name[50];
	float score;
};
int c05_�ṹ��() {
	//struct Student stu1 = { 1,"С��", 3.14 };

	struct Student stu1;
	stu1.id = 1;
	stu1.score = 3.14;
	strcpy(stu1.name, "С��");     //�� C ������ַ����飨�� stu1.name������ֱ���ø�ֵ����� = �����丳�ַ���ֵ��������Ϊ�ַ�����������������Ԫ�صĵ�ַ�����ڳ���ָ�룬�޷�ֱ���� = ��һ���ַ���������ֵ������

	printf("stu1.id---%d\n", stu1.id);
	printf("stu1.name---%s\n", stu1.name);
	printf("stu1.score---%lf\n", stu1.score);
	printf("�ṹ�峤��---%d\n", sizeof(struct Student));

	return 0;
}

