export const dom = {
	// 判断元素是否有某一个className
	// el 被判断的元素
	// className class 的名称
	hasClass (el, className) {
		let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
		return reg.test(el.className)
	},

	// 给一个元素添加className
	// el 要添加的元素
	// className class 的名称
	addClass (el, className) {
		if (hasClass(el, className)) {
			return
		}

		let newClass = el.className.split(' ')
		newClass.push(className)
		el.className = newClass.join(' ')
	},

	// 给一个元素删除className
	// el 要删除的元素
	// className class 的名称
	removeClass (el, className) {
		if (hasClass(el, className)) {
			let newClass = el.className.split(' ')
			newClass.forEach((value, index, array) => {
				if (value === className) {
					newClass.splice(index, 1)
				}
			})
			el.className = newClass
		}
	},

	// 获取 、添加属性
	// el 要获取添加的元素
	// dataname 属性的名字
	// setValue 不存在则是获取的操作   存在就是设置的操作  其值就是设置的值
	getData (el, dataname, setValue) {
		if(setValue) {
			el.setAttribute(dataname, setValue)
		} else {
			el.getAttribute(dataname)
		}
	},

	// 在页面中插入一个css的样式
	// url 样式文件的地址
	addCss (url) {
		let linkElm = document.createElement('link');
		linkElm.setAttribute('rel', 'stylesheet');
		linkElm.setAttribute('type', 'text/css');
		linkElm.setAttribute('href', url);
		document.head.appendChild(linkElm);
	},

	// 在页面中插入一个js的样式
	// src 为js的地址
	addJs (src) {
		let script = document.createElement("script");
		script.type = "text/script";
		script.src = src;
		document.getElementsByTagName("html")[0].appendChild(script);
	},

	// 获取滚动条的宽度
	getScrollWidth () {
	let noScroll,   //没有scroll时候的 clientWidth
		scroll,     //有scroll时候的 clientWidth
		oDiv = document.createElement('div');    //创建一个div  之后再删除
		oDiv.style.cssText = 'position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;';
		noScroll = document.body.appendChild(oDiv).clientWidth;
		oDiv.style.overflowY = 'scroll';
		scroll = oDiv.clientWidth;
		document.body.removeChild(oDiv);
		return noScroll - scroll; 
	}
}
