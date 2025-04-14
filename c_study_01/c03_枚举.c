#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

enum WeekDay {
	Monday = 0,//枚举的值递增//默认首元素的值是0
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday
};
int c03_枚举() {
	enum WeekDay day = Sunday;
	printf("day---%d\n", day);

	return 0;
}

