// 浏览器相关方法
export const utils = {
	// 设备信息
	deviceVersion () {
		const u = navigator.userAgent
		const app = navigator.appVersion
		return {		// 移动终端浏览器版本信息
			userAgent: u,
			appVersion: app,
			trident: u.includes('Trident'),	 // IE内核
			presto: u.includes('Presto'), 	// opera内核
			webKit: u.includes('AppleWebKit'), 	// 苹果、谷歌内核
			gecko: u.includes('Gecko') && !u.includes('KHTML'), 	// 火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),		// 是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 	// ios终端
			android: u.includes('Android') || u.includes('Linux'), 	// android终端或者uc浏览器
			iPhone: u.includes('iPhone') || u.includes('Mac'), 	// 是否为iPhone或者QQHD浏览器
			iPad: u.includes('iPad'), 	// 是否iPad
			webApp: !u.includes('Safari'), 	// 是否web应该程序，没有头部与底部,
			language: (navigator.browserLanguage || navigator.language).toLowerCase(),	// 浏览器语言
			plugins: navigator.plugins,		// 返回一个类似数组的对象，成员是浏览器安装的插件，比如Flash、ActiveX等
			platform: navigator.platform,		// 属性返回用户的操作系统信息
			isOnline: navigator.onLine, 	// 返回一个布尔值，表示用户当前在线还是离线
			geolocation: navigator.geolocation 		// 返回一个Geolocation对象，包含用户地理位置的信息。
		}
	},

	// 设置console  带有自定义美化的功能
	// text： 内容;
	// isOneLine：  是否一行显示（1行相当于3行log的高度 所以不能换行）;
	// author：用户名称 ；
	setConsole (options) {
		let defaultV = {
			text: 'this is console!',
			isOneLine: 1,
			author: '未曾遗忘的青春'
		}
		let newValue = Object.assign(defaultV, options)
		if (newValue.isOneLine) {
			console.log('')
			console.log(`%c${newValue.text}  ---  ${newValue.author}`, `background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:20px 40px;color:#fff;font-size:12px;`)
			console.log('')
		} else {
			console.log(`%c${newValue.text}  ---  ${newValue.author}`, `background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuMCIgeTE9IjAuNSIgeDI9IjEuMCIgeTI9IjAuNSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2Y2NjYyIvPjxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjMzM5OTk5Ii8+PHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiNjY2NjOTkiLz48c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzk5Y2NmZiIvPjxzdG9wIG9mZnNldD0iODAlIiBzdG9wLWNvbG9yPSIjY2NjY2ZmIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmY5OWNjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');background-size: 100%;background-image: -webkit-gradient(linear, 0% 50%, 100% 50%, color-stop(0%, #66cccc), color-stop(20%, #339999), color-stop(40%, #cccc99), color-stop(60%, #99ccff), color-stop(80%, #ccccff), color-stop(100%, #ff99cc));background-image: -moz-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: -webkit-linear-gradient(left, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);background-image: linear-gradient(to right, #66cccc 0%, #339999 20%, #cccc99 40%, #99ccff 60%, #ccccff 80%, #ff99cc 100%);padding:0;color:#fff;font-size:12px;`)
		}
	},

	// 移动端rem的设计
	initRem () {
        let _self = {}
        let _pdfwidth = 750
        let _minScreenWidth = 320
        let _maxScreenWidth = 515
        let _minScreenWidthP = _minScreenWidth / _pdfwidth
        let _maxScreenWidthP = _maxScreenWidth / _pdfwidth
        _self.resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
        _self.Html = document.getElementsByTagName('html')[0]
        _self.widthProportion = function () {
            let p = Number(((document.body && document.body.clientWidth) || _self.Html.offsetWidth) / _pdfwidth).toFixed(4)
            let betterInfo = (p = p > _maxScreenWidthP ? 0.6867 : p) < _minScreenWidthP ? 0.4267 : p
            return betterInfo
        }
        _self.changePage = function () {
			_self.Html.setAttribute('style', 'font-size:' + _self.widthProportion() * 100 + 'px')
        }
        _self.changePage()
        if (!document.addEventListener) return
        window.addEventListener(_self.resizeEvt, _self.changePage, false)
        document.addEventListener('DOMContentLoaded', _self.changePage, false)
	},

	// 判断数据类型格式
	initType () {
		this.dataType = {}
		let type = (o) => {
			let s = Object.prototype.toString.call(o)
			return s.match(/\[object (.*?)\]/)[1].toLowerCase()
		}

		const _self = this
		let eachArry = ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp']
		eachArry.forEach(function (t) {
				_self.dataType['is' + t] = function (o) {
				return type(o) === t.toLowerCase()
			}
		})
	},

	// 从数组中获取num 个随机不重复的元素
	// arr 需要取出的数组
	// num 取出数组的数量
	getRandomEleFromArr (arr, num) {
		let testArr = new Set(arr)
		let newArr = Array.from(testArr)

		let resultArr = []
		for (let i = 0; i < num; i++) {
			if (newArr.length > 0) {
				let index = Math.floor(Math.random() * newArr.length)
				resultArr.push(newArr[index])
				newArr.splice(index, 1)
			} else {
				console.error(`数组中没有超过${num}个不同的元素哦`)
				break
			}
		}
		return resultArr
	},

	// 浏览器的notification 提示
	notification (options) {
		const _self = this
		const defaultV = {
			title: '未曾遗忘的青春',
			body: 'Hello World !!!',
			icon: 'http://www.daiwei.org/index/images/logo/dw1.png'
		}
		let newOpt = Object.assign(defaultV, options)
		return new Promise((resolve, reject) => {
			if (window.Notification && Notification.permission !== 'denied') {
				Notification.requestPermission(function (status) {
					let n = new Notification(newOpt.title, {
						body: newOpt.body,
						icon: newOpt.icon
					})
					n.onshow = function () {
						_self.setConsole({
							text: 'this is an notification test!',
							isOneLine: 0,
							author: '未曾遗忘的青春'
						})
					}
					n.onclick = function () {
						resolve()
					}
				})
			} else {
				reject()
			}
		})
	},

	// 返回rgba随机色参数为透明度   
	randomColor (opacity = 1) {
		let r = Math.floor(Math.random() * 256)
		let g = Math.floor(Math.random() * 256)
		let b = Math.floor(Math.random() * 256)
		return `rgba(${r},${g},${b},${opacity})`
	},

	// outline 提现布局框架   by  Addy Osmani
	showLayoutFramework () {
		[].forEach.call( document.querySelectorAll('*'), function (a) { a.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16) })
	},

	// 返回浏览器url的参数 返回一个对象
	getUrlParam (url) {
		let _arr = url.search.slice(1).split('&')
		let _obj = {}
		for (let i = 0; i < _arr.length; i++) {
			_obj[_arr[i].split('=')[0]] = _arr[i].split('=')[1]
		}
		return _obj
	},

	// 返回一个字符串的长度，汉字算2个字符长度
	strLength (str) {
		let a = 0
		for (let i = 0; i < str.length; i++) {
			let count = str.charCodeAt(i) > 255 ? 2 : 1
			a += count
		}
		return a
	},

	// extendDeep  深拷贝
	extendDeep (newinfo, options) {
		const _self = this
        for (var k in options) {
            if (options.hasOwnProperty(k)) {
                if (typeof options[k] === 'object') {
                    _self.extendDeep(newinfo[k], options[k])
                } else {
                    newinfo[k] = options[k]
                }
            }
        }
        return newinfo
	}
}

// 初始化判断数据类型格式
utils.initType()
