#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
//传值无法改变值。
void sitch3(int aa, int bb) {
	int temp = aa;
	aa = bb;
	bb = temp;
	printf("sitch3---aa%d\n", aa);
	printf("sitch3---bb%d\n", bb);
}



//查看地址
void sitch4(int aaa, int bbb) {
	int temp = aaa;
	aaa = bbb;
	bbb = temp;
	printf("sitch4查看地址---aaa%d\n", &aaa);
	printf("sitch4查看地址---bbb%d\n", &bbb);
}
//可以改变值
void sitch5(int *aaaa, int *bbbb) {
	int temp = *aaaa;
	*aaaa = *bbbb;
	*bbbb = temp;
	printf("sitch5查看地址---aaaa---%d\n", &aaaa);
	printf("sitch5查看地址---bbbb---%d\n", &bbbb);
	printf("sitch5查看指针---aaaa---%d\n", *aaaa);
	printf("sitch5查看指针---bbbb---%d\n", *bbbb);


}


int b03_互换两个数() {
	int a = 100;
	int b = 200;
	printf("1========================\n");
	printf("a---%d\n", a);
	printf("b---%d\n", b);

	int temp = a;
	a = b;
	b = temp;
	printf("2========================\n");
	printf("a---%d\n", a);
	printf("b---%d\n", b);


	printf("3========================\n");
	int aa = 11;
	int bb = 22;
	sitch3(aa, bb);
	printf("aa---%d\n", aa);
	printf("bb---%d\n", bb);


	printf("4========================\n");
	int aaa = 11;
	int bbb = 22;
	sitch4(aaa, bbb);
	printf("main查看地址aaa---%d\n", &aaa);
	printf("main查看地址bbb---%d\n", &bbb);

	printf("5========================\n");
	int aaaa = 11;
	int bbbb = 22;
	sitch5(&aaaa, &bbbb);
	printf("main查看地址aaaa---%d\n", &aaaa);
	printf("main查看地址bbbb---%d\n", &bbbb);
	printf("main查看值aaaa---%d\n", aaaa);
	printf("main查看值bbbb---%d\n", bbbb);
	//printf("main查看指针aaaa---%d\n", *aaaa);
	//printf("main查看指针bbbb---%d\n", *bbbb);
	printf("6========================\n");
	return 0;
}

