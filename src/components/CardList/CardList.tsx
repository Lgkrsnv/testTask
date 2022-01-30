import Card from '../Card/Card';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPhotos, IPhoto, IPhotosState } from '../../reducers/photosReducer';
import { RootState } from '../../reducers/rootReducer';
import { useAppDispactch } from '../../store/store';
import { Grid } from '@mui/material';

const CardList: FC<Pick<IPhotosState, "page">> = ({page}) => {
	const dispatch = useAppDispactch();
	const photosList = useSelector((state: RootState) => state.photos.photosList)
	const limit = useSelector((state: RootState) => state.photos.limit);
	const sorting = useSelector((state: RootState) => state.photos.sorting);
	const filters = useSelector((state: RootState) => state.photos.filters);
	useEffect(() => {
		dispatch(fetchPhotos())
	}, [page, limit, sorting, filters, dispatch])
	return (
		<>
			<Grid container justifyContent='space-evenly' mb={4}>
				{(photosList.length > 0) && photosList.map((item: IPhoto) => {
					return (
						<Card key={item.id} albumId={item.albumId} id={item.id} thumbnailUrl={item.thumbnailUrl} title={item.title} url={item.url} />
					)
				})}
			</Grid>
		</>
	);
}
export default CardList;

