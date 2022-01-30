import { FC, useEffect } from "react";
import CardList from "../../components/CardList/CardList";
import Pagination from '@mui/material/Pagination';
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { useAppDispactch } from "../../store/store";
import { fetchAllAlbumIds, setPage } from "../../reducers/photosReducer";
import Controls from "../../components/Controls/Controls";
import { Grid } from "@mui/material";

const MainPage:FC = () => {
	const dispatch = useAppDispactch()
	const page = useSelector((state: RootState) => state.photos.page);
	const count = useSelector((state: RootState) => state.photos.count);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch(setPage(value));
	};
	useEffect(() => {
		dispatch(fetchAllAlbumIds())
	}, []);

	return(
		<Grid container direction='column' alignItems='center' justifyContent={'space-between'} pb={4}>
			<Controls />
			<CardList page={page}/>
			<Pagination count={count} color="primary" page={page} onChange={handleChange} />
		</Grid>
	)
}

export default MainPage;