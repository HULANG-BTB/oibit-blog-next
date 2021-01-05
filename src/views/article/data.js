export default {
  id: 27,
  title: '洛谷 P1024 一元三次方程求解',
  abstract:
    '有形如：ax^3+bx^2+cx^1+d=0这样的一个一元三次方程。给出该方程中各项的系数(a,b,c,d均为实数)，并约定该方程存在三个不同实根(根的范围在−100至100之间)，且根与根之差的绝对值≥1。要求由小到大依次在同一行输出这三个实根(根与根之间留有空格)，并精确到小数点后2位',
  content:
    '题目描述\n----\n\n有形如：$ax^3+bx^2+cx^1+d=0$ 这样的一个一元三次方程。给出该方程中各项的系数(a,b,c,d均为实数)，并约定该方程存在三个不同实根(根的范围在−100至100之间)，且根与根之差的绝对值≥1。要求由小到大依次在同一行输出这三个实根(根与根之间留有空格)，并精确到小数点后2位。\n\n提示：记方程$f(x)=0$，若存在2个数$x1$和$x2$，且$x1<x2$，$f(x_1)*f(x_2)<0$，则在$(x1,x2)$之间一定有一个根。\n\n输入输出格式\n------\n\n**输入格式：**\n\n一行，4个实数A,B,C,D\n\n**输出格式：**\n\n一行，3个实根，并精确到小数点后2位。\n\n输入输出样例\n------\n\n**输入样例#1：**\n```\n1 -5 -4 20\n```\n**输出样例#1：**\n```\n-2.00 2.00 5.00\n```\n解题思路\n------\n根据题目描述中的给出的提示，不妨直接选定两个值，计算出$f(x1)$和$f(x2)$的乘积，这里值得考虑的是，这个x1和x2的范围应该到多大，再次读题，发现题目中有一个关键的条件。根与根之差的绝对值≥1，所以我们不妨从-100开始一直到100遍历，每次让$x1=i$ 且 $x2=i+1$，然后再去计算。当判断这个区间内有跟的时候在对这个长度为1的区间进行二分。\n除了题目给出的提示外，我们还应该想到，除了零点左右异号之外，还有一个条件，如果零点刚好在我们的整数点上，可能会出现$f(x1)*f(x2)=0$的情况，所以我们也需要处理一下。\n二分的过程中，如果$f(mid)*f(hi)$的值符号为正，则证明$mid$和$hi$这两个点在0点的同一侧，直接让$hi=mid$即可。\n题解\n------\n```c++\n/***\n*   main.cpp\n*   Created by AloneH on 2019/4/25 10:18:05.\n*\n***/\n#include <iostream>\n#include <algorithm>\n#include <cmath>\n#include <iomanip>\n\nusing namespace std;\n\ndouble a, b, c, d;\n\ndouble fx(double x) {\n    return a * pow(x, 3) + b * pow(x, 2) + c * x + d;\n}\n\ndouble getans(double lo, double hi) {\n    double ans = 0;\n    while (abs(hi - lo) > 0.00000001) {\n        double mid = (lo + hi) / 2;\n        ans = fx(mid);\n        if (ans * fx(hi) > 0) {\n            hi = mid;\n        }\n        else {\n            lo = mid;\n        }\n    }\n    return lo;\n}\n\nint main() {\n    cout.setf(ios::fixed);\n    cin >> a >> b >> c >> d;\n    for (double i = -100; i <= 100; i++)\n    {\n        double fi = fx(i);\n        double fj = fx(i + 1);\n        if (fi * fj < 0) {\n            cout << setprecision(2) << getans(i, i + 1) << " ";\n        }\n        else if (fi == 0) {\n            cout << setprecision(2) << i << " ";\n        }\n    }\n    return 0;\n}\n```',
  username: 'Lang Hu',
  category: {
    id: 4,
    title: '原创',
    create_time: null,
    update_time: null,
    del: 0
  },
  tags: [
    {
      id: 18,
      name: '算法'
    },
    {
      id: 21,
      name: '二分搜索'
    }
  ],
  comment: 0,
  view: 78,
  status: 0,
  top: 0,
  create_time: '2019-04-25 11:54:22',
  update_time: '2019-11-27 21:05:36',
  thumbnail: '/uploads/Images/thumbnail/default.png',
  del: 0,
  like: 0
}
