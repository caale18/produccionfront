import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layout/Loader';
import Error from './layout/Error'; // Importa el componente Error


const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const  [price, setPrice] = useState([0, 15000]);
    const [category, setCategory] = useState('');

    const categories = [
        'Desktop',
        'Laptops',
        'Accesorios',
        'Audifonos',
        'Cargadores',
        'Discos_duros'
    ]

    const { keyword } = useParams();
    const dispatch = useDispatch();

    const { products, loading, error, productsCount, resPerPage } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, price, category));

        // Limpiar errores si existen
        return () => {
            if (error) {
                dispatch(clearErrors());
            }
        };
    }, [dispatch, error, keyword, currentPage, price, category]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Fragment>
            <MetaData title={'Compra los mejores productos en línea'} />
            <h1 id="products_heading" className="mb-4">Últimos Productos ({productsCount})</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Error message={error} />
            ) : (
                <section id="products" className="container mt-5">
                    <div className="row">


                        {keyword ? (
                            <Fragment>
                                <div className='col-6 col-md-3 mt-5 mb-5'>
                                    <div className='px-5'>
                                        <Slider
                                            range 
                                            marks={{
                                                1 : `Q.1`,
                                                15000 : `Q.15000`,
                                            }}
                                            min={1} 
                                            max={15000}
                                            defaultValue={[1, 15000]}
                                            tipFormatter={value => `Q.${value}`}
                                            tipProps={{
                                                placement: 'top',
                                                visible: true,
                                            }}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />

                                        <hr className='my-5' />

                                        <div className='mt-5'>
                                            <h4 className='mb-3'>
                                                Categories
                                            </h4>

                                            <ul className='pl-0'>
                                                {categories.map(category => (
                                                    <li
                                                        style={{cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                        key={category}
                                                        onClick={()  => setCategory(category)}

                                                    >
                                                        {category}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div className='col-6 col-md-9'>
                                    <div className='row'>
                                        {products.length > 0 ? (
                                            products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))
                                        ) : (
                                            <div className="col-12">
                                                <p className="text-center">No hay productos disponibles.</p>
                                            </div>
                                        )}    
                                    </div>

                                </div>
                            </Fragment>
                        ): (
                                products.length > 0 ? (
                                    products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                ) : (
                                    <div className="col-12">
                                        <p className="text-center">No hay productos disponibles.</p>
                                    </div>
                                )                            
                        )}
                    </div>
                </section>
            )}

            {resPerPage <= productsCount && (
                <div className='d-flex justify-content-center mt-5'>
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText={'⟩'}
                        prevPageText={'⟨'}
                        firstPageText={'«'}
                        lastPageText={'»'}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            )}
        </Fragment>
    );
};

export default Home;






