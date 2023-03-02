export function setAttributes(elem, attr) {
	for (const key in attr) {
		elem.setAttribute(key, attr[key]);
	}
}
