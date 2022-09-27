import { Grid } from '@mui/material';
import Table from '../../Table';
import { useSelector } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useState } from 'react';
import CustomModal from '../../Modal';
import AddNoteDetailsForm from './AddForm';

function NoteDetailsTable() {
  const { selectedNote } = useSelector((state) => state.Note);
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  const noteData = [{ ...selectedNote }];

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: '#',
    },
    {
      id: 'title',
      numeric: false,
      disablePadding: false,
      label: t('title'),
    },
    {
      id: 'categoryName',
      numeric: false,
      disablePadding: false,
      label: t('category'),
    },
    {
      id: 'creationDate',
      numeric: false,
      disablePadding: false,
      label: t('creationDate'),
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: t('noteDescription'),
    },
  ];

  const onRenderRow = (row) => {
    return (
      <>
        <TableCell align='left'>{row.title}</TableCell>
        <TableCell align='left'>{row.categoryName}</TableCell>
        <TableCell align='left'>{row.creationDate}</TableCell>
        <TableCell align='left'>{row.description}</TableCell>
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

  return (
    <Grid container spacing={2} justifyContent='left' sx={{ p: 1 }}>
      <Table
        headCells={headCells}
        rows={noteData}
        includesToolbar={true}
        isDeleteAllowed={true}
        isEditingAllowed={false}
        isViewDetailsAllowed={false}
        headTitle={t('notesDetails')}
        onRenderRow={onRenderRow}
      />

      <Grid container spacing={2} justifyContent='center' sx={{ p: 1 }}>
        <Grid item xs={12} md={2}>
          <Button
            sx={{ width: 1 }}
            variant='contained'
            onClick={onAddMoreNoteHandler}
          >
            {t('addMoreNote')}
          </Button>
        </Grid>
      </Grid>

      <CustomModal
        open={openModal}
        handleOpen={onOpenModalHandler}
        handleClose={onCloseModalHandler}
        title={t('addMoreNote')}
      >
        <AddNoteDetailsForm />
      </CustomModal>
    </Grid>
  );
}

export default NoteDetailsTable;
