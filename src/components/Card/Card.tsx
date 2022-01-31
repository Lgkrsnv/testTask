import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Button } from '@mui/material';
import { deletePhoto, IPhoto } from '../../reducers/photosReducer';
import { makeStyles } from '@mui/styles';
import { useAppDispactch } from '../../store/store';

const useStyles = makeStyles({
	paper: {
		width: '13rem',
		marginBottom: '20px',
		marginRight: '20px',
		padding: '10px',
		paddingBottom: '20px',
	},
	btn: {
		marginTop: 'auto',
	},
	img: { marginBottom: '15px', cursor: 'pointer' },
	title: { flexGrow: '1', marginBottom: '10px', textAlign: 'center' }
});
interface handleClickOpen {
	handleClickOpen: (url: string) => void
}
const Card: FC<IPhoto & handleClickOpen> = ({ id, thumbnailUrl, title, albumId, url, handleClickOpen }) => {

	const cardStyles = useStyles();
	const dispatch = useAppDispactch();

	const handleDelete = (id: number): void => {
		dispatch(deletePhoto(id));
	}
	return (
		<Paper elevation={3} className={cardStyles.paper} >
			<Grid container direction='column' justifyContent={'space-around'} alignItems={'center'} style={{ height: '100%' }}>
				<img src={thumbnailUrl} alt={title} className={cardStyles.img} onClick={() => handleClickOpen(url)} />

				<Typography  variant="h6">
					Album: {albumId}
				</Typography>

				<Typography gutterBottom>
					Photo: {id}
				</Typography>

				<Typography className={cardStyles.title} variant="body2" color="text.secondary">
					{title}
				</Typography>

				<Button onClick={() => handleDelete(id)} variant='outlined' color='primary' className={cardStyles.btn}>Delete</Button>

			</Grid>
		</Paper>
	);
}

export default Card;