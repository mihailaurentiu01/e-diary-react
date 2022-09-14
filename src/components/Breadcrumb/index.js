import Breadcrumbs from '@mui/material/Breadcrumbs';

function Breadcrumb(props) {
  const onHandleClickDefault = (e) => {
    e.preventDefault();
  };

  return (
    <div
      role='presentation'
      onClick={props.onHandleClick || onHandleClickDefault}
    >
      <Breadcrumbs aria-label='breadcrumb'>{props.children}</Breadcrumbs>
    </div>
  );
}

export default Breadcrumb;
