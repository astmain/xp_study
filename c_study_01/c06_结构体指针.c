#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
struct Student {
	int id;
	char name[50];
	float score;
};

int c06_�ṹ��ָ��() {
	printf("111---%d\n", 222);
	struct Student stu1;
	stu1.id = 1;
	stu1.score = 3.14;
	strcpy(stu1.name, "С��");

	printf("1���ṹ��ȡֵ ==========================================\n");
	struct Student* point = &stu1;
	printf("point->id---%d\n", point->id);
	printf("(*point).id---%d\n", (*point).id);
	printf("(*point).score---%f\n", (*point).score);
	printf("(*point).name---%s\n", (*point).name);
	printf("stu1.name---%s\n", stu1.name);


	point->id = 2;	//1��ָ�븴��
	printf("1��ָ�븴��---id---%d\n", point->id);

	printf("2���ṹ�� ==========================================\n");
	//�����ṹ��ָ��ȡֵ ��*point��.age �ȼ��� point->age���� (**point).age �ȼ��� ��*point)->age
	struct Student** point2 = &point;
	printf("(*point2)->id---%d\n", (*point2)->id);

	(**point2).id = 3;	//2��ָ�븴��
	printf("(*point2)->id---id---%d\n", (*point2)->id);







	return 0;
}

