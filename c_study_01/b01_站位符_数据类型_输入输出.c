#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h> 
#include <stdlib.h> 

int b01_վλ��_��������_�������() {
	int size_int = sizeof(int);
	printf("int---���͵ĳ���Ϊ---%d\n", size_int);
	printf("chart---���͵ĳ���Ϊ---%d\n", sizeof(char));
	printf("float---���͵ĳ���Ϊ---%d\n", sizeof(float));
	printf("double---���͵ĳ���Ϊ---%d\n", sizeof(double));
	printf("long---���͵ĳ���Ϊ---%d\n", sizeof(long));
	printf("short---���͵ĳ���Ϊ---%d\n", sizeof(short));
	printf("signed---���͵ĳ���Ϊ---%d\n", sizeof(signed));

	if (-1) {
		printf("����(-1)��ʽtrue\n");
	}

	if (0) {

	}
	else {
		printf("����(0)false\n");
	}

	if (1) {
		printf("111\n");
	}
	else {
		printf("222\n");
	}

	//������� =====================================================================================
	float f = 3.14159265;
	double d = 3.14159265;
	printf("f----%f\n", f);//
	printf("4f----%.4f\n", f);
	printf("lf----%lf\n", d);
	printf("10lf----%.10lf\n", d);


	int i = 12345678;
	printf("hd----%hd\n", i);
	//24910     
	//0001 0010 0011 0100 0101 0110 0111 1000
	//               0010 0011 1001 0001 0000
// 
	//��ͬ������ Ҫ�ò�ͬ��ռλ��  ,����Ҫ�ٰٷֺź������" .����" 

	char cArray[] = { 'A','B' };
	printf("cArray�ڴ��ַ==%x\n", &cArray);//62fe00
	printf("cArray�ڴ��ַ==%#x\n", &cArray);//0x62fe00
	printf("cArray����---%s\n", &cArray);

	char* text = "I love you";
	printf("text�ڴ��ַ---%s\n", &text);//SA@
	printf("text����---%s\n", text);//I love you

	////���뺯�� ==============================================================
	int i1;
	printf("��������һ������Ϊ��˧������:\n");
	scanf("%d", &i);
	//printf("�����������ʱ---%d\n", i);

	char carray2[] = { 'H','E','L','L','O' };
	int j;
	for (j = 0; j < 5; j++) {
		printf("---%c\n", carray2[j]);
	}
	printf("---%s\n", carray2);


	system("pause");//��ͣ
	return 0;
}



/*
c���Ի�������
char
int
float
double
long
short
signed
unsigned
void
C����û��boolean,byte


int---���͵ĳ���Ϊ---4
chart---���͵ĳ���Ϊ---1
float---���͵ĳ���Ϊ---4
double---���͵ĳ���Ϊ---8
long---���͵ĳ���Ϊ---4
short---���͵ĳ���Ϊ---2
signed---���͵ĳ���Ϊ---4



%d      int
#ld     long int
%c      char
%f      float
%u     �޷���
%hd     ������
%lf     double
%x     ʮ���������int  ���� long int ���� short 
#%x    ����
%o     �˽���
%s     �ַ���

*/