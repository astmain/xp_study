#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

//ָ��ı�ֵ
//С�ܽ᣺ͨ�����������޸�����������ͨ������ֵ  
//1.ʵ�α�������ͨ�����ĵ�ַ   ---&a1(ʵ��)
//2.�βα�����ָ�����        ---*a1(�β�)
//3.����������ͨ���޸�*a1�β����ķ�ʽ�޸�����������ر�����ֵ


//�༶ָ��
//ָ��ָ������ڴ��ַ
//��ַ����ָ��
int b05_�༶ָ��111() {
	int a1 = 100;                 //����һ��int���͵ı���i,���Ҹ�ֵΪ100
	int* addressPoint1 = &a1;                 //1��ָ��   ����һ��int���͵�һ��ָ�����address1�����Ұ�i�ĵ�ַ��ֵ����
	int** addressPoint2 = &addressPoint1;     //2��ָ�� 
	int*** addressPoint3 = &addressPoint2;    //3��ָ�� 
	int**** addressPoint4 = &addressPoint3;   //4��ָ�� 


	//�༶ָ��ȡֵ****addressPoint4�õ���ֵ��100
	printf("****addressPoint4---%d\n", ****addressPoint4);
	printf("****addressPoint4---%d\n", ***addressPoint4);
	printf("****addressPoint4---%x\n", ***addressPoint4);
	return 0;
}
