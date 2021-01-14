// string
let s: string = 'aaa';
console.log(s)

// number
let num: number = 123;
console.log(num)

// 不声明具体数据类型，由代码推断出数据类型
let a = '122';
console.log(a)

// 布尔
let b: boolean = false;
console.log(b)

// 数组 数据类型[]
let arr: string[] = ['11', '22'];
console.log(arr)

// void
function funA(): void {
  console.log('定义了一个没有返回值的函数')
}
funA();

// function funNum(): number {
//   console.log('定义了一个有返回值的函数')
//   return 1;
// }

// null
// undefined
