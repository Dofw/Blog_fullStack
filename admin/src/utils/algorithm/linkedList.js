/**
 * 链表
 */

class CreateLinkedItem {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

const link1 = new CreateLinkedItem(1)
const link2 = new CreateLinkedItem(2)
const link3 = new CreateLinkedItem(3)
const link4 = new CreateLinkedItem(4)
const link5 = new CreateLinkedItem(5)
const link6 = new CreateLinkedItem(6)

link1.next = link2
link2.next = link3
link3.next = link4
link4.next = link5
link5.next = link6
console.log(JSON.stringify(link1))

//1.链表的逆序：思路是找到最后一个list
function reverseList(list) {
  if (!list || list.next === undefined) {
    //不存在、不是链表
    return
  }

  // 逆序, 使用两个next的目的，是跟换指针后，还能保留前一个的应用信息。才能从后往前连接起来。
  if (list.next.next === null) {
    console.log(111, list.next)

    //将list.next指向前一个，前一个list.next 指向null。
    let lastList = list.next
    list.next.next = list // 保留了前一个list。
    list.next = null
    console.log(222, lastList)

    return lastList // 返回逆序的根
  }
  // 需要倒序思维考虑
  // 先将自己保存在下一个先lastList = list.next lastList.next = list, 然后将自己的next清空 list.next = null
  // (由于传入的是list.next, 替换list后, list.next.next = null)
  // 由于 reverseList 递归到最后都保存了前一次的引用，保证了连接关系。后续只需要将保存的next指向当前list，当前的list.next 置空。
  const last = reverseList(list.next)
  list.next.next = list // 这里赋值前一个list
  list.next = null // 最后将自己置空
  return last
}

const newList = reverseList(link1)
console.log(333, newList)

// //说明
// 1, 2, 3

// 1(递归1)
//   2(递归2)
//   3-2(3.next保存着2当前值) 2-null(2.next置空null) return 3(返回3)
// (递归2执行完成后，执行下面)
// 2-1(放心改变2.next = 1当前值 ，因为3中保留同时此时2.next=null) 1-null(当前值置空)
