#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

enum WeekDay {
	Monday = 0,//ö�ٵ�ֵ����//Ĭ����Ԫ�ص�ֵ��0
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday
};
int c03_ö��() {
	enum WeekDay day = Sunday;
	printf("day---%d\n", day);

	return 0;
}

