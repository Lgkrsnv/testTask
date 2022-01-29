import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
	status: Status
	count: number
	page: number
	limit: number
	total: number
}

const initialState: IPhotosState = {
	photosList: [],
	status: null,
	count: 0,
	page: 1,
	limit: 20,
	total: 0
} as IPhotosState

export const fetchTotalCount = createAsyncThunk(
	'photos/fetchTotalCount',
	async () => {
		const response = await fetch(`/photos?_start=0&_end=1`);
		return response.headers.get('x-total-count');
	})

export const fetchPhotos = createAsyncThunk<IPhoto[], { page: number, limit: number }>(
	'photos/fetchPhotos',
	async ({ page, limit }) => {
		try {
			const response = await fetch(`/photos?_page=${page}&_limit=${limit}`);

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
		builder.addCase(fetchTotalCount.fulfilled, (state, {payload}) => {
			if (payload) {
				state.total = Number(payload);
				state.count = Math.ceil(Number(payload)/state.limit);
			}
		})
	},
})

export const { setPage } = photosSlice.actions
export default photosSlice.reducer