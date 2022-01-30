import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { setSorting, Sorting, setFilters } from '../../reducers/photosReducer';
import { RootState } from '../../reducers/rootReducer';
import { useAppDispactch } from '../../store/store';

const Constrols:FC = () => {
	const dispatch = useAppDispactch();
	const albumsList = useSelector((state: RootState) => state.photos.albumsList)
	const sorting = useSelector((state: RootState) => state.photos.sorting)
	const filters = useSelector((state: RootState) => state.photos.filters)

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	

	const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event;
		dispatch(setFilters(typeof value === 'string' ? value.split(',') : value));
	};


	const handleSortingChange = (event: SelectChangeEvent) => {
		dispatch(setSorting(event.target.value as Sorting));
	};
	return (
		<Grid container justifyContent={'center'} mb={3} mt={2}>
			<Grid>
				<FormControl sx={{ m: 1, width: 300 }}>
					<InputLabel id="filter">Filter</InputLabel>
					<Select
						labelId="filter"
						placeholder='Multiple filter'
						id="filter"
						multiple
						value={filters}
						onChange={handleFilterChange}
						input={<OutlinedInput label="Name" />}
						MenuProps={MenuProps}
					>
						{albumsList.map((albumn) => (
							<MenuItem
								key={albumn.id}
								value={albumn.id}
							>
								{albumn.id}{' - album id'}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid>
				<FormControl sx={{ m: 1, minWidth: 300 }}>
					<InputLabel id="sorting">Sorting</InputLabel>
					<Select
						labelId="sorting"
						id="sorting"
						value={sorting}
						onChange={handleSortingChange}
						autoWidth
						label="Sorting"
					>
						<MenuItem value="">
							None
						</MenuItem>
						<MenuItem value={'asc'}>Album asc</MenuItem>
						<MenuItem value={'desc'}>Album desc</MenuItem>
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
}

export default Constrols;
