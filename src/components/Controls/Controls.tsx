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
					<InputLabel id="demo-multiple-name-label">Album id filter</InputLabel>
					<Select
						labelId="demo-multiple-name-label"
						id="demo-multiple-name"
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
								{albumn.id}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid>
				<FormControl sx={{ m: 1, minWidth: 300 }}>
					<InputLabel id="demo-simple-select-autowidth-label">Sorting by album id</InputLabel>
					<Select
						labelId="demo-simple-select-autowidth-label"
						id="demo-simple-select-autowidth"
						value={sorting}
						onChange={handleSortingChange}
						autoWidth
						label="Sorting"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={'asc'}>Asc</MenuItem>
						<MenuItem value={'desc'}>Desc</MenuItem>
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
}

export default Constrols;
