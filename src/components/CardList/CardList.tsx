import Card from '../Card/Card';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPhotos, fetchTotalCount, IPhoto } from '../../reducers/photosReducer';
import { RootState } from '../../reducers/rootReducer';
import { useAppDispactch } from '../../store/store';
import { Grid } from '@mui/material';

const CardList: FC = () => {
	const dispatch = useAppDispactch();
	const photosList = useSelector((state: RootState) => state.photos.photosList)

	useEffect(() => {
		dispatch(fetchTotalCount());
		dispatch(fetchPhotos({page: 0, limit: 20}))
	}, [])
	return (
		<>
			<Grid container justifyContent='space-evenly'>
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

