import * as React from 'react';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Dialog({ showModal, setShowModal,url, setUrl, }: any) {


	const handleClose = () => {
		setShowModal(false);
		setUrl('');
	};

	return (
		<div>
			<MuiDialog
				open={showModal}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				
				<DialogContent>

					<img src={url} alt={url} />

				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>Close</Button>
				</DialogActions>
			</MuiDialog>
		</div>
	);
}