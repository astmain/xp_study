// arr = [{aaa: 111, bbb: 222, ccc: 333}, {ccc: 333, aaa: 111, bbb: 222},]  //帮我把这个数组, 每个元素种的key 排序号
// console.log(`111---222:`,tool_list_key_sort(arr))

function tool_list_key_sort(list) {
	const result = list.map(obj => {
		const sortedObj = {}
		Object.keys(obj).sort().forEach(key => {
			sortedObj[key] = obj[key]
		})
		return sortedObj
	})
	return result
}
module.exports =tool_list_key_sort










