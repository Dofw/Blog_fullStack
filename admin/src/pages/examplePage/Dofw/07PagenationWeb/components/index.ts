export function filterCurrent(data, pageSize, pageNo) {
  if (data.length <= pageSize) return data

  return []
}
