export const insertItem = (list) => {// 向数组的每个元素中间插入|
  const len = list.length;
  const arr = []
  for(let i = 0;i < len;i++){
    arr.push(list.slice(i,i+1))
  }
  for(let j = 0;j < arr.length-1;j++){
      arr[j].push('|')
  }
  list = [].concat.apply([], arr)
  return list
}