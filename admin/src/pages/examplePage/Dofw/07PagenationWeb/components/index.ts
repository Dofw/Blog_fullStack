/**
 * 根据当前页面，选出合理的数据。
 * @param data
 * @param pageSize
 * @param pageNo
 * @returns
 */
export function filterCurrentPage(data, pageSize, pageNo) {
  if (!data || !Array.isArray(data)) {
    throw "数据不存在, 或者不是数组"
  }
  // 判断合理性
  const pages = Math.ceil(data.length / pageSize)

  if (pageNo > pages) {
    throw "数据不合理, pageNo 大于所有的页码数量"
  }

  if (pages) if (data.length <= pageSize) return data

  const maxNum = pageNo * pageSize // 10 0-9 20 10-19
  const leftNum = maxNum - pageSize
  const rightNum = data.length < maxNum ? data.length : maxNum

  return data.slice(leftNum, rightNum + 1)
}
