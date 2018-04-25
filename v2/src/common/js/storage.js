export const storage = {
	// 设置Cookie
	// name: 为cookie的名字
	// value: 为对应的值
	// exp: 为过期时间  单位为毫秒   默认设置为2个小时的过期时间
	setCookie (name, value, exp = 60 * 60 * 2 * 1000) {
		let date = new Date()
		date.setTime(date.getTime() + exp)
		document.cookie = `${name}=${escape(value)};expires=${date.toGMTString()}`
	},
	// 获取Cookie
	// name: 为cookie的名字
	getCookie (name) {
		if (name) {
			let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
			let arr = document.cookie.match(reg)
			if (arr) {
				// return arr[2]
				return arr[2]
			} else {
				return null
			}
		} else {
			let getAllCookies = []
			if (document.cookie !== '') {
				let arrCookie = document.cookie.split('; ')
				for (let k in arrCookie) {
					getAllCookies.push({
						name: `${unescape(arrCookie[k].split('=')[0])}`,
						value: `${unescape(arrCookie[k].split('=')[1])}`
					})
				}
				return getAllCookies
			} else {
				return null
			}
		}
	},
	// 删除 Cookie
	// name: 为cookie的名字
	deleteCookie (name) {
		let date = new Date()
		date.setTime(date.getTime() - 1)  // 设置过期了
		if (name) {
			let cookieInfo = Storage.getCookie(name)
			if (cookieInfo !== null) {
				document.cookie = `${name}=${cookieInfo};expires=${date.toGMTString()}`
			}
		} else {
			let getAllCookies = Storage.getCookie()
			for (let k in getAllCookies) {
				document.cookie = `${getAllCookies[k].name}=${getAllCookies[k].value};expires=${date.toGMTString()}`
			}
		}
	},

	// 本地存储
	// 是否支持本地存储
	isLStorage () {
		return window.localStorage ? true : false
	},

	// 是否有对应的本地存储内容
	hasLStorage () {
		if(this.isLStorage) {
			return !(window.localStorage.getItem(storage_name) === null)
		} else {
			return false
		}
	},

	// 设置本地存储
	setLStorage (key, value) {
		if (this.lStorage) {
			window.localStorage.setItem(key, value)
		} else {
			return false
		}
	},

	// 获取本地存储
	getLStorage (key) {
		if (this.lStorage) {
			return window.localStorage.getItem(key)
		} else {
			return false
		}
	},

	// 清除单个本地存储
	rmLStorage (key) {
		if (this.lStorage) {
			window.localStorage.removeItem(key)
		} else {
			return false
		}
	},

	// 清除所有本地存储
	clearLStorage () {
		if (this.lStorage) {
			window.localStorage.clear()
		} else {
			return false
		}
	},

	// 数据存储本地  相当于下载一个文件  该文件是需要存储的数据   的方法
	// name 相对路径的文件名称   如 ./test.txt
	// data 要存储的数据
 	saveDataAsFile (name, data) {
		let fake_click = (obj) => {  
		    let ev = document.createEvent("MouseEvents")
		    ev.initMouseEvent(  
		        "click", true, false, window, 0, 0, 0, 0, 0  
		        , false, false, false, false, 0, null  
		        )
		    obj.dispatchEvent(ev)
		}

		let urlObject = window.URL || window.webkitURL || window
		let export_blob = new Blob([data])
		let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")

		save_link.href = urlObject.createObjectURL(export_blob)
		save_link.download = name
		fake_click(save_link)
	},
}