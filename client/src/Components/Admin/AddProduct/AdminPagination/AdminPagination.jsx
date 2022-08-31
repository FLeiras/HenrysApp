import React from 'react';
import Button from 'react-bootstrap/Button';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';
import './AdminPagination.css';
function AdminPagination({
  burgersPerPage,
  allProducts,
  currentPage,
  setCurrentPage,
}) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(allProducts / burgersPerPage); i++) {
    pages.push(i);
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const changePaginate = (page) => {
    setCurrentPage(Number(page));
    scrollToTop();
  };

  function prevPage() {
    const back = currentPage - 1;
    if (back >= pages[0]) {
      changePaginate(back);
    }
  }

  function nextPage() {
    const next = currentPage + 1;
    if (next <= pages[pages.length - 1]) {
      changePaginate(next);
    }
  }

  // si el item select coincide con la pág
  // lo hice para que se ponga active
  function isItemSelect(numItem) {
    return numItem === currentPage;
  }

  // si la pag actual no es la primera
  function isItemFirst() {
    return currentPage === pages[0];
  }

  // si la pag actual no es la ultima
  function isItemLast() {
    return currentPage === pages[pages.length - 1];
  }

  return (
    <div className="mt-5 mb-4">
      {pages && pages.length > 0 && (
        <>
          <Button
            variant="secondary"
            className={
              !isItemFirst()
                ? 'btn__admin__effect '
                : 'btn__admin__effect  disablePagAdmin'
            }
            type="button"
            onClick={prevPage}
          >
            <CaretLeftFill />
          </Button>
        </>
      )}

      {pages &&
        pages.map((page) => (
          <Button
            variant="secondary"
            type="button"
            id={page}
            value={page}
            key={page}
            onClick={(e) => changePaginate(e.target.id)}
            className={
              isItemSelect(page)
                ? 'btn__admin__effect  currentPag'
                : 'btn__admin__effect  '
            }
          >
            {page}
          </Button>
        ))}

      {pages && pages.length > 0 && (
        <>
          <Button
            variant="secondary"
            className={
              !isItemLast()
                ? 'btn__admin__effect '
                : 'btn__admin__effect  disablePagAdmin'
            }
            type="button"
            onClick={nextPage}
          >
            <CaretRightFill />
          </Button>
        </>
      )}
    </div>
  );
}

export default AdminPagination;
