import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { getQueryString } from './utils';

export interface IPhoto {
	albumId: number
	id: number
	title: string
	url: string
	thumbnailUrl: string
}
export type Status = 'pending' | 'fulfilled' | 'rejected' | null;

export interface IPhotosState {
	photosList: IPhoto[]
	albumsList: IAlbum[]
	status: Status
	count: number
	page: number
	limit: number
	total: number
	filters: number[]
	sorting: 'asc' | 'desc' | ''
}

const initialState: IPhotosState = {
	photosList: [],
	albumsList: [],
	status: null,
	count: 0,
	page: 1,
	limit: 20,
	total: 0,
	filters: [],
	sorting: '',
} as IPhotosState
export interface IAlbum {
	userId: number,
	id: number,
	title: string
}
export const fetchTotalCount = createAsyncThunk(
	'photos/fetchTotalCount',
	async () => {
		try {
			const response = await fetch(`/photos?_start=0&_end=1`);
			return response.headers.get('x-total-count');
		} catch (error) {
			console.log(error);
		}
	})

export const fetchAllAlbumIds = createAsyncThunk<IAlbum[]>(
	'photos/getAllAlbumIds',
	async () => {
		try {
			const response = await fetch(`/albums`);
			return (await response.json());
		} catch (error) {
			console.log(error);

		}
	})

export const fetchPhotos = createAsyncThunk<IPhoto[]>(
	'photos/fetchPhotos',
	async (_, { getState }) => {
		try {
			const state = getState() as RootState;
			const page = state.photos.page;
			const limit = state.photos.limit;
			const filters = state.photos.filters;
			const sorting = state.photos.sorting; 
			const queryStr = getQueryString({filters, sorting, page, limit});
			const response = await fetch(`/photos${queryStr}`);
			return (await response.json());
		} catch (e) {
			console.log(e);

		}

	}
)

const photosSlice = createSlice({
	name: 'photos',
	initialState,
	reducers: {
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPhotos.fulfilled, (state, action) => {
			state.status = 'fulfilled'
			state.photosList = action.payload;

		})
		builder.addCase(fetchPhotos.pending, (state, action) => {
			state.status = 'pending';

		})

		builder.addCase(fetchPhotos.rejected, (state, action) => {
			state.status = 'rejected';
		})
		builder.addCase(fetchAllAlbumIds.fulfilled, (state, action) => {
			state.status = 'fulfilled'
			state.albumsList = action.payload;

		})
		builder.addCase(fetchTotalCount.fulfilled, (state, { payload }) => {
			if (payload) {
				state.total = Number(payload);
				state.count = Math.ceil(Number(payload) / state.limit);
			}
		})
	},
})

export const { setPage } = photosSlice.actions
export default photosSlice.reducer