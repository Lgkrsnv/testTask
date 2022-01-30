import { IPhotosState } from "./photosReducer";

export const getQueryString = ({ filters, sorting, page, limit }: Pick<IPhotosState, "filters" | "sorting" | "page" | "limit">): string => {
	let str = `?_page=${page}&_limit=${limit}`
	if (sorting) {
		str += `_sort=albumId&_order=${sorting}`;
	}
	if (filters.length > 0) {
		filters.forEach(item => str += `albumId=${item}`)
	}
	return str;
} 
