/*
  排序说明： 核心思想是 比较 和 交换。
  常用排序： 冒泡排序、选择排序、快速排序。
  区别： 任何排序之间 没有优劣之分， 只有在对应的场景下拥有更高的性能优势。
*/

const arr = [15, 9, 3, 10, 4, 5, 4, 8, 7]

// 核心思想：比较
function compare(a, b) {
  //严谨性判断再次处理。
  if (a > b) {
    // 规则可以随便定。
    return true
  }
  return false
}

// 核心思想：交换
function swap(arr, index1, index2) {
  let num = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = num
}

//1.冒泡排序：外循环arr.lengh-1, 内循环 每次将 符合条件(或大或小) 的放在最右边。 场景：有顺序的。
function bubbleSort(arr) {
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < arr.length - 1 - j; i++) {
      // arr.length - 1, 循环到倒数第二为。因为 i + 1 刚好是最后一位。
      //每一轮结束后，已经将满足条件的放到了最右侧。故下次就只循环 arr.length - j
      if (compare(arr[i], arr[i + 1])) {
        //比较完，就交换
        swap(arr, i, i + 1)
      }
    }
  }
}

//2.选择排序：先找出 最大或最小, 然后和最后一个交换，下次循环和arr.lenght-1-i 交换。 个人分析：从时间度上 冒泡要高于选择排序，原因swap的执行次数，循环次数-1。
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    //每次循环 找符合条件的
    let index = 0
    for (let j = 0; j < arr.length - i; j++) {
      if (compare(arr[index], arr[j])) {
        index = j
      }
    }
    //然后交换
    swap(arr, index, arr.length - 1 - i)
  }
}

/*
3.快速排序：思路是 去第一个作为参考值，将小于的放在参考值一侧，将大于的放于参考值得另一侧。不用声明两个变量的方式是因为浪费空间。

标准：一直操作的一个arr。
实现方式: 双指针、递归。
应用场景: 杂乱无章的。
关键点：
swapPoint取right(一直代表满足左侧条件的最后一个), 确保右侧的数据全在 右侧。
由left部分致使left > right, 说明right是满足left的条件的。
由right部分致使left > right, 说明right满足right的条件（也就是left的条件）。
交换就是交换 left侧的最后一个即right指的位置。这样确保所有的右侧数据都在swapPoint的右侧。

注意：两个dowhile的条件，外层和内层left，是从第二个开始。

(特别注意临界情况，即：end - start = 1的情况，比如0、1) 和 关键点结合理解
如果满足left比较条件，left 比 初始right 大，后面swapPoint 为取right，真实交换，
如果不满足left必定满足right，此时right 变成 初始 left，swapPoint，为left的值， 和自身交换。```此时的right就是不满足right条件(即满足left条件), 此时即是满足left条件的最后一个也是第一个```
*/
function quickSort(arr, start, end) {
  //严谨性判断
  if (start > end - 1) {
    return
  }

  let left = start
  let right = end

  // 这里dowhile，为了从第二项开始
  do {
    //先循环左指针，直到不符合条件为止：这里互换条件a>b为ture
    // 这里dowhile，为了从第二项开始
    do {
      left++
    } while (left <= right && compare(arr[start], arr[left])) // left == right, 如果这里不满足compare。那么下面的必定满足。

    //再循环右指针，直到不符合条件为止。
    while (left <= right && !compare(arr[start], arr[right])) {
      right--
    }

    //如果此时start < right，说明两个循环都结束了并且都不满足对应的比较条件 进行交换
    if (left < right) {
      swap(arr, left, right)
    }
  } while (left < right)

  //跳出循环，left = right 、left > right( 内部条件，始终是 left > right 跳出的。)
  //交换
  // let startSwapPoint = left === right ? right - 1 : right // 可以作为理解，加上也不会错。
  let startSwapPoint = right
  swap(arr, start, startSwapPoint)

  //递规左侧，
  quickSort(arr, start, startSwapPoint - 1)

  // 递归右侧
  quickSort(arr, startSwapPoint + 1, end)
}

// bubbleSort(arr)
// selectSort(arr)
quickSort(arr, 0, arr.length - 1)
console.log(arr)
