#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
//��ֵ�޷��ı�ֵ��
void sitch3(int aa, int bb) {
	int temp = aa;
	aa = bb;
	bb = temp;
	printf("sitch3---aa%d\n", aa);
	printf("sitch3---bb%d\n", bb);
}



//�鿴��ַ
void sitch4(int aaa, int bbb) {
	int temp = aaa;
	aaa = bbb;
	bbb = temp;
	printf("sitch4�鿴��ַ---aaa%d\n", &aaa);
	printf("sitch4�鿴��ַ---bbb%d\n", &bbb);
}
//���Ըı�ֵ
void sitch5(int *aaaa, int *bbbb) {
	int temp = *aaaa;
	*aaaa = *bbbb;
	*bbbb = temp;
	printf("sitch5�鿴��ַ---aaaa---%d\n", &aaaa);
	printf("sitch5�鿴��ַ---bbbb---%d\n", &bbbb);
	printf("sitch5�鿴ָ��---aaaa---%d\n", *aaaa);
	printf("sitch5�鿴ָ��---bbbb---%d\n", *bbbb);


}


int b03_����������() {
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
	printf("main�鿴��ַaaa---%d\n", &aaa);
	printf("main�鿴��ַbbb---%d\n", &bbb);

	printf("5========================\n");
	int aaaa = 11;
	int bbbb = 22;
	sitch5(&aaaa, &bbbb);
	printf("main�鿴��ַaaaa---%d\n", &aaaa);
	printf("main�鿴��ַbbbb---%d\n", &bbbb);
	printf("main�鿴ֵaaaa---%d\n", aaaa);
	printf("main�鿴ֵbbbb---%d\n", bbbb);
	//printf("main�鿴ָ��aaaa---%d\n", *aaaa);
	//printf("main�鿴ָ��bbbb---%d\n", *bbbb);
	printf("6========================\n");
	return 0;
}

