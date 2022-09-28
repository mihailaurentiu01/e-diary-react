import { Grid } from '@mui/material';
import Table from '../../Table';
import { useSelector } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getNoteDetails, deleteNoteDetails } from '../../../services/Api';

import { useDispatch } from 'react-redux';
import CustomModal from '../../Modal';
import AddNoteDetailsForm from './AddForm';
import useHttp from '../../../hooks/useHttp';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarActions } from '../../../store/modules/Snackbar';
import ResponsiveDialog from '../../ResponsiveDialog';

function NoteDetailsTable() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedNoteDetailsId, setSelectedNoteDetailsId] = useState('');

  const { selectedNote } = useSelector((state) => state.Note);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const { setType, setMessage, setOpen } = SnackbarActions;

  const {
    sendRequest: sendRequestGetNoteDetails,
    status: statusGetNoteDetails,
    error: errorGetNoteDetails,
    data: dataNoteDetails,
    clearError: clearErrorGetNoteDetails,
  } = useHttp(getNoteDetails, true);

  const {
    onUpdateStatusAwaiting,
    status: statusDelete,
    error: errorDelete,
    clearError: clearErrorDelete,
    sendRequest: sendRequestDelete,
  } = useHttp(deleteNoteDetails);

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: '#',
    },
    {
      id: 'noteDetails',
      numeric: false,
      disablePadding: false,
      label: t('noteDetails'),
    },
    {
      id: 'creationDate',
      numeric: false,
      disablePadding: false,
      label: t('creationDate'),
    },
  ];

  const { id } = selectedNote;

  useEffect(() => {
    if (statusGetNoteDetails === 'pending') {
      if (statusDelete === '') {
        sendRequestGetNoteDetails();
        onUpdateStatusAwaiting();
      }
    }

    if (statusDelete === 'completed') {
      sendRequestGetNoteDetails();
      onUpdateStatusAwaiting();

      dispatch(setType('success'));
      dispatch(setMessage(t('alertMessages.successNoteDetailsDeleted')));
      dispatch(setOpen(true));
    }
  }, [
    id,
    sendRequestGetNoteDetails,
    statusDelete,
    dispatch,
    setType,
    setMessage,
    setOpen,
    onUpdateStatusAwaiting,
  ]);

  const fileteredNoteDetails = dataNoteDetails?.filter((noteDetails) => {
    return noteDetails.noteId === selectedNote.id;
  });

  if (errorGetNoteDetails) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
    clearErrorGetNoteDetails();
  }

  if (errorDelete) {
    dispatch(setType('error'));
    dispatch(setMessage(t('errorMessages.unexpected')));
    dispatch(setOpen());
    clearErrorDelete();
  }

  const onRenderRow = (row) => {
    return (
      <>
        <TableCell align='left'>{row.noteDetails}</TableCell>
        <TableCell align='left'>{row.creationDate}</TableCell>
      </>
    );
  };

  const onOpenModalHandler = () => {
    setOpenModal(true);
  };

  const onCloseModalHandler = () => {
    setOpenModal(false);
  };

  const onAddMoreNoteHandler = () => {
    onOpenModalHandler();
  };

  const onDeleteHandler = (selected) => {
    setSelectedNoteDetailsId(selected[0]);
    setOpenDialog(true);
  };

  const onNewNoteAdded = useCallback(() => {
    sendRequestGetNoteDetails();
  }, []);

  const onCloseDialogHandler = () => {
    setOpenDialog(false);
  };

  const onDeleteConfirmHandler = () => {
    sendRequestDelete({
      id: selectedNoteDetailsId,
    });
  };

  return (
    <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
      {(statusGetNoteDetails === 'pending' ||
        statusDelete === 'pending' ||
        (statusGetNoteDetails === 'pending' && statusDelete === 'await')) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {statusGetNoteDetails === 'completed' && statusDelete === 'await' && (
        <Box>
          <Table
            headCells={headCells}
            rows={fileteredNoteDetails}
            includesToolbar={true}
            isDeleteAllowed={true}
            isEditingAllowed={false}
            isViewDetailsAllowed={false}
            headTitle={t('notesDetails')}
            onRenderRow={onRenderRow}
            onDelete={onDeleteHandler}
          />

          <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
            <Grid item xs={12} md={3}>
              <Button
                sx={{ width: 1 }}
                variant='contained'
                onClick={onAddMoreNoteHandler}
              >
                {t('addMoreNote')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      <CustomModal
        open={openModal}
        handleOpen={onOpenModalHandler}
        handleClose={onCloseModalHandler}
        title={t('addMoreNote')}
      >
        <AddNoteDetailsForm onNewNoteAdded={onNewNoteAdded} />
      </CustomModal>

      {openDialog && (
        <ResponsiveDialog
          open={openDialog}
          handleClose={onCloseDialogHandler}
          context={t('wantToDeleteNoteDetails')}
          title={t('delete')}
          optionCancel={t('no')}
          optionAgree={t('yes')}
          handleOnAgree={onDeleteConfirmHandler}
        />
      )}
    </Grid>
  );
}

export default NoteDetailsTable;
