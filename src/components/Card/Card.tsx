import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Button } from '@mui/material';
import { IPhoto } from '../../reducers/photosReducer';
import { makeStyles } from '@mui/styles';
import { useAppDispactch } from '../../store/store';

const useStyles = makeStyles({
	paper: {
		width: '12rem',
		marginBottom: '20px',
		marginRight: '20px',
		padding: '20px'
	},
	btn: {
		marginTop: '1.2rem',
	},
	img: { marginBottom: '15px', cursor: 'pointer' }
});

const Card: FC<IPhoto & any> = ({ id, thumbnailUrl, title, albumId, url, handleClickOpen }) => {

	const cardStyles = useStyles();
	const dispatch = useAppDispactch();
	const handleDelete = (id) => {
		dispatch(deletePhoto(id));
	} 
	return (
		<Paper elevation={3} className={cardStyles.paper} >
			<Grid container direction='column' justifyContent={'space-between'} alignItems={'center'}>
				<img src={thumbnailUrl} alt={title} className={cardStyles.img} onClick={() => handleClickOpen(url)} />

				<Typography gutterBottom variant="h6" component="div">
					Album: {albumId} {' '}
					Photo: {id}
				</Typography>

				<Typography variant="body2" color="text.secondary">
					{title}
				</Typography>

				<Button onClick={handleDelete} variant='outlined' color='primary' className={cardStyles.btn}>Delete</Button>
			</Grid>
		</Paper>
	);
}

export default Card;