
 // Helper functions.
const getContext = (width, height) => {
	const canvas = document.createElement('canvas')
	canvas.setAttribute('width', width)
	canvas.setAttribute('height', height)
	return canvas.getContext('2d')
}

const getImageData = (img, loaded) => {
	const imgObj = new Image()
	const imgSrc = img.src || img

	// Can't set cross origin to be anonymous for data url's
	// https://github.com/mrdoob/three.js/issues/1305
	if (imgSrc.substring(0, 5) !== 'data:') {
		imgObj.crossOrigin = 'Anonymous'
	}

	imgObj.onload = () => {
		const context = getContext(imgObj.width, imgObj.height)
		context.drawImage(imgObj, 0, 0)
		const imageData = context.getImageData(0, 0, imgObj.width, imgObj.height)
		loaded && loaded(imageData.data)
	}
	imgObj.src = imgSrc
}

const makeRGB = name => ['rgb(', name, ')'].join('')

const mapPalette = palette => {
    const arr = []
    for (const prop in palette) { arr.push(frmtPobj(prop, palette[prop])) }
    arr.sort((a, b) => b.count - a.count)
    return arr
}
const fitPalette = (arr, fitSize) => {
	if (arr.length > fitSize) {
		return arr.slice(0, fitSize)
	} else {
		for (let i = arr.length - 1; i < fitSize - 1; i++) { arr.push(frmtPobj('0,0,0', 0)) }
		return arr
	}
}
var frmtPobj = (a, b) => ({
	name: makeRGB(a),
	count: b
})
// RGBaster Object
// ---------------
//
const PALETTESIZE = 10

export const RGBaster = {}

RGBaster.colors = (img, opts) => {
	opts = opts || {}

	const // for example, to exclude white and black:  [ '0,0,0', '255,255,255' ]
	exclude = opts.exclude || [ ]

	const paletteSize = opts.paletteSize || PALETTESIZE

	getImageData(img, data => {
		const colorCounts = {}
		let rgbString = ''
		const rgb = []
		// const colors = {
		// 	dominant: { name: '', count: 0 },
		// 	palette:  []
		// }
		let i = 0
		for (; i < data.length; i += 4) {
			rgb[0] = data[i]
			rgb[1] = data[ i + 1 ]
			rgb[2] = data[ i + 2 ]
			rgbString = rgb.join(',')
			// skip undefined data and transparent pixels
			if (rgb.includes(undefined) || data[ i + 3 ] === 0) {
				continue
			}
			// Ignore those colors in the exclude list.
			if (!exclude.includes(makeRGB(rgbString))) {
				if (rgbString in colorCounts) {
					colorCounts[rgbString] = colorCounts[rgbString] + 1
				} else {
					colorCounts[rgbString] = 1
				}
			}
		}
		if (opts.success) {
			const palette = fitPalette(mapPalette(colorCounts), paletteSize + 1)
			opts.success({
				dominant: palette[0].name,
				secondary: palette[1].name,
				palette: palette.map(c => c.name).slice(1)
			})
		}
	})
}
