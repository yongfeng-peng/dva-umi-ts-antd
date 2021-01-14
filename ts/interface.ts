// 接口的声明
interface inf {

}

// 接口必须的成员变量
interface inf {
  name: string
}

// 接口可选的成员变量，可以有，可以没有
interface inf {
  age?: number
}

// 复杂的接口定义
interface inf {
  name: string
  age?: number
  say: () => void
  userList: string[]
}

// 接口的继承
interface child extends inf {

}