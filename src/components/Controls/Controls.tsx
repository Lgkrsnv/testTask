import {  FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useState } from 'react';
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
	const MenuPropsFilter = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
		const MenuPropsSort = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 300,
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
				<FormControl sx={{ m: 1, minWidth: 300 }}  variant="outlined">
					<InputLabel id="filter">Filter by albums ids</InputLabel>
					<Select
						labelId="filter"
						id="filter"
						multiple
						value={filters}
						onChange={handleFilterChange}
						MenuProps={MenuPropsFilter}
						label='Filter by albums ids'
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
				<FormControl sx={{ m: 1, minWidth: 300 }} variant="outlined">
					<InputLabel id="sorting">Sort albums</InputLabel>
					<Select
						labelId="sorting"
						id="sorting"
						value={sorting}
						onChange={handleSortingChange}
						autoWidth
						label="Sort albums"
						MenuProps={MenuPropsSort}
					>
						<MenuItem value="">
							None
						</MenuItem>
						<MenuItem value={'asc'}>Sort ascending</MenuItem>
						<MenuItem value={'desc'}>Sort descending</MenuItem>
					</Select>
				</FormControl>
			</Grid>

		</Grid>
	);
}

export default Constrols;
