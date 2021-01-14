class fx {
  name: string
  age: number
  say() {
    console.log(`${this.name}---${this.age}岁`)
  }
}

let f = new fx();
f.name = 'heihei';
f.age = 18;
f.say();

class fx1<IProps = {}> {
  user: IProps
  say() {
    console.log(this.user);
  }
}

interface IUser {
  name: string
  age: number
}

// 泛型只关注为需要的数据，不关注具体的数据格式
let f1 = new fx1<IUser>();
f1.user = {age: 18, name: 'aa'};
f1.say();