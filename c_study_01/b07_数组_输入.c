#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>


int b07_����_����() {
    printf("���������鳤��\n");
    int length;
    scanf("%d", &length);
    printf("����������鳤��Ϊ---%d\n", length);
    //int iArr[length];�� C ����� ����д�����ڿɱ䳤�����飨VLA�������� C99 ��׼��������ԡ�Ҫ����ı�������֧�� C99 ���߸��ߵı�׼�����޷�ʶ��ɱ䳤�����飬��������
    int* iArr = (int*)malloc(length * sizeof(int)); // ��̬�����ڴ�
    if (iArr == NULL) {
        printf("�ڴ����ʧ��\n");
        return 1;
    }
    int i;
    for (i = 0; i < length; i++) {
        printf("������iArr[%d]��ֵ\n", i);
        //scanf("%d", &iArr[i]);//��������ȡֵ
        scanf("%d", iArr+i);  //��������ָ��ȡֵ
    }
    printf("���=========================\n");
    for (i = 0; i < length; i++) {
        printf("iArr[%d]��ֵΪ---%d\n", i, iArr[i]);
    }
    free(iArr); // �ͷ��ڴ�
    return 0;
}