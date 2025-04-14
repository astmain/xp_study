
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
int b10_动态创建数组() {
	printf("请输入您要创建数组的长度\n");
	//长度
	int len;
	scanf("%d", &len);
	printf("您输入的长度为---%d\n", len);


	//分配内存空间
	int* iArr = (int*)malloc(len * 4);             // 动态分配内存

	//赋值
	int i;
	for (i = 0; i < len; i++) {
		printf("请输入iArr[%d]的值---\n", i);
		scanf("%d", iArr + i);
	}

	//二次输入数组扩展长度
	printf("请输入您要创建数组的长度");
	int len_extend;
	scanf("%d", &len_extend);
	printf("您输入的扩展长度为---%d\n", len_extend);

	//重新分配内存空间
	iArr = realloc(iArr, (len + len_extend) * 4);
	//赋值
	for (i = len; i < len + len_extend; i++) {
		printf("请输入iArr[%d]的值---\n", i);
		scanf("%d", iArr + i);
	}

	//结果
	printf("结果\n");
	for (i = 0; i < len + len_extend; i++) {
		printf("请输入iArr[%d]的值---%d\n", i, *(iArr + i));
	}

	return 0;
}

