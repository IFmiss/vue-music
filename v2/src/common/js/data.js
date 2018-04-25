// 数据交互相关方法
// 比如图片加载   ajax请求的封装等等
export const data = {
	// 图片加载的一个promise  path 是图片的地址
	preloadImage (path) {
		return new Promise((resolve, reject) => {
			let image = new Image()
			image.onload  = resolve
			image.onerror = reject
			image.src = path;
		});
	}
}