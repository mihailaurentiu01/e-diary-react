import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddCategoryForm from "../../../components/Category/AddForm";
import { useDispatch } from "react-redux";
import { NavbarActions } from "../../../store/modules/Navbar";
import { useEffect } from "react";

function AddCategory() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { setCurrentPage } = NavbarActions;

  useEffect(() => {
    dispatch(setCurrentPage(t("addCategory")));
  }, [dispatch, setCurrentPage]);

  return (
    <>
      <Typography align='left' variant='h4'>
        {t("addCategory")}
      </Typography>
      <p>Breadcrumb</p>

      <AddCategoryForm />
    </>
  );
}

export default AddCategory;
