import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Button,  } from '@mui/material';
import { IPhoto } from '../../reducers/photosReducer';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	paper: {
		width: '200px',
		marginBottom: '20px',
		marginRight: '20px',
		padding: '20px'
	},
});

const Card: FC<IPhoto> = ({ id, thumbnailUrl, title, url, albumId }) => {

	const cardStyles = useStyles();

	return (
		<Paper elevation={3} className={cardStyles.paper} >
			<Grid container direction='column' justifyContent={'center'} alignItems={'center'}>
			<img src={thumbnailUrl} alt={title} style={{marginBottom: '15px'}}/>
			<Typography gutterBottom variant="h5" component="div">
				Album: {albumId} {' '}
				Photo: {id}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{title}
			</Typography>
			<Button variant='outlined' color='primary' style={{marginTop: '10px'}}>Delete</Button></Grid>
		</Paper>
	);
}

export default Card;