#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
struct Student {
	int id;
	char name[50];
	float score;
};
int c05_结构体() {
	//struct Student stu1 = { 1,"小许", 3.14 };

	struct Student stu1;
	stu1.id = 1;
	stu1.score = 3.14;
	strcpy(stu1.name, "小许");     //在 C 语言里，字符数组（如 stu1.name）不能直接用赋值运算符 = 来给其赋字符串值。这是因为字符数组名代表数组首元素的地址，属于常量指针，无法直接用 = 把一个字符串常量赋值给它。

	printf("stu1.id---%d\n", stu1.id);
	printf("stu1.name---%s\n", stu1.name);
	printf("stu1.score---%lf\n", stu1.score);
	printf("结构体长度---%d\n", sizeof(struct Student));

	return 0;
}

