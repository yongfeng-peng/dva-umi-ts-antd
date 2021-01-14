enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIght = 'right'
}

enum User {
  UP = 'up',
}

console.log(Direction.UP)
// 简单理解 有自己的独立作用域
// console.log(Direction.UP === User.UP)

const a = 1;
const b = 1;
console.log(a == b)
