import { React, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProductsCardAdminContainer from '../ProductCardAdminContainer/ProductsCardAdminContainer';
import AddProductsFilters from '../AddProductFilters/AddProductsFilters';
import AdminSearchBarProduct from '../AdminSearchBar/AdminSearchBarProduct';
import AdminPagination from '../AdminPagination/AdminPagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../../Redux/actions/actions';
import './AddProductHome.css';
import ErrorNoResults from '../../../ErrorNoResults/ErrorNoResults';

function AddProductHome() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const allProducts = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [burgersPerPage, setBurgersPerPage] = useState(8);
  const lastBurgerIndex = currentPage * burgersPerPage;
  const firstBurgerIndex = lastBurgerIndex - burgersPerPage;
  const currentProduct = allProducts.slice(firstBurgerIndex, lastBurgerIndex);
  const mount = useRef(false);
  const [filters, setFilters] = useState({
    category,
    order: '',
    search: '',
    isVeggie: '',
    isDeleted: '',
    addBase: 'true',
    addIngredient: 'true',
  });

  function setFilter(name, value) {
    if (filters[name] === 'true' && value === 'true') {
      setFilters({ ...filters, [name]: '' });
    }

    if (filters[name] === value) return;

    setFilters({ ...filters, [name]: value });
  }

  const setPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!mount.current) {
      dispatch(
        getProduct(
          filters.category,
          filters.order,
          filters.search,
          filters.isVeggie,
          filters.isDeleted,
          filters.addBase,
          filters.addIngredient
        )
      );
      mount.current = true;
    } else if (filters) {
      setPage(1);
      dispatch(
        getProduct(
          filters.category,
          filters.order,
          filters.search,
          filters.isVeggie,
          filters.isDeleted,
          filters.addBase,
          filters.addIngredient
        )
      );
    }
  }, [dispatch, filters]);

  return (
    <Container>
      <div className="addProductHome__container">
        <h2>Gestioná tus productos</h2>
        <AddProductsFilters setFilter={setFilter} filters={filters} />
        <AdminSearchBarProduct setFilter={setFilter} />
        {!currentProduct.length && <ErrorNoResults />}
        {currentProduct.length > 0 && (
          <ProductsCardAdminContainer
            currentProduct={currentProduct}
            isDeleted={!filters.isDeleted.length}
          />
        )}

        <AdminPagination
          burgersPerPage={burgersPerPage}
          allProducts={allProducts.length}
          currentPage={currentPage}
          setCurrentPage={setPage}
        />
      </div>
    </Container>
  );
}

export default AddProductHome;
