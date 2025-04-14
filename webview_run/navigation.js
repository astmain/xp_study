module.exports = async function navigation(callback) {
	this.addEventListener('did-start-navigation', async (event) => {
		try {
			await callback(event)
		} catch (error) {
			console.error(`did-start-navigation---error:`, error)
		}
	})
}