function tool_get_keys_by_name(list) {
	keys = []
	list.map(o => {
		keys.push(o.name)
	})
	
	return keys
}



module.exports = tool_get_keys_by_name