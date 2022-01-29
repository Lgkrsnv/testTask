import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IPhoto   {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export interface IPhotosState {
	photosList: IPhoto[]
}

const initialState: IPhotosState = {
	 photosList: [] 
} as IPhotosState

export const fetchPhotos = createAsyncThunk(
	'photos/fetchPhotos',
	async () => {
		const response = await fetch(`/photos?_page=0&_limit=20`)
		return (await response.json()) as IPhoto[]
	}
)

const photosSlice = createSlice({
	name: 'photos',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPhotos.fulfilled, (state, action) => {
			state.photosList = action.payload;
			
		})
	},
})

export const { } = photosSlice.actions
export default photosSlice.reducer