import { FC } from "react";
import CardList from "../../components/CardList/CardList";
import Pagination from '@mui/material/Pagination';
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { useAppDispactch } from "../../store/store";
import { setPage } from "../../reducers/photosReducer";

const MainPage:FC = () => {
	const dispatch = useAppDispactch()
	const page = useSelector((state: RootState) => state.photos.page);
	const count = useSelector((state: RootState) => state.photos.count);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch(setPage(value));
	};
	return(
		<>
			<CardList/>
			<Pagination count={count} color="primary" page={page} onChange={handleChange} />
		</>
	)
}

export default MainPage;