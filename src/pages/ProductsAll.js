import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import {
  GridViewIcon,
  HomeIcon,
  ListViewIcon,
} from "../icons";
import {
  Card,
  CardBody,
  Label,
  Select,
  Button
} from "@windmill/react-ui";
import Icon from "../components/Icon";
import ProductListView from "../components/ProductListView";
import ProductGridView from "../components/ProductGridView";
import { getProducts, loadProducts, productRequested } from "../store/entities/products";

const ProductsAll = (props) => {
  const [view, setView] = useState("grid");

  // pagination setup
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const {productData} = props

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    props.isLoadingProducts()
    // setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [props]);

  const totalResults = productData.length

  const [filter, setFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Handle list view
  const handleChangeView = () => {
    if (view === "list") {
      setView("grid");
    }
    if (view === "grid") {
      setView("list");
    }
  };

  const handlerStatus = (status) => {
    if(status === "Sort by"){
      setStatusFilter("all")
    }
    if(status === "Unpublished"){
      setStatusFilter("unpublish")
    }
    if(status === "Published"){
      setStatusFilter("publish")
    }
    if(status === "Draft"){
      setStatusFilter("draft")
    }
  }

  const handleFilter = (filter_name) => {
    if(filter_name === "All") {
      setFilter("all")
    }
    if(filter_name === "Fertilizer") {
      setFilter("fertilizer")
    }
    if(filter_name === "Seedlings") {
      setFilter("seedlings")
    }
    if(filter_name === "Insecticide") {
      setFilter("insecticide")
    }
  }

  return (
    <div>

      <PageTitle>All Products</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-green-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">All Products</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Filter Products
              </p>

              <Label className="mx-3">
                <Select className="py-3" onChange={(e) => handlerStatus(e.target.value)}>
                  <option>Sort by</option>
                  <option>Unpublished</option>
                  <option>Published</option>
                  <option>Draft</option>
                </Select>
              </Label>

              <Label className="mx-3">
                <Select className="py-3" onChange={(e) => handleFilter(e.target.value)}>
                  <option>All</option>
                  <option>Fertilizer</option>
                  <option>Seedlings</option>
                  <option>Insecticide</option>
                </Select>
              </Label>

              <Label className="mr-8">
                {/* <!-- focus-within sets the color for the icon when input is focused --> */}
                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                  <input
                    className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                    placeholder="Number of Results"
                    value={resultsPerPage}
                    onChange={(e) => setResultsPerPage(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                    {/* <SearchIcon className="w-5 h-5" aria-hidden="true" /> */}
                    Results on {`${view}`}
                  </div>
                </div>
              </Label>
            </div>
            <div className="">
              <Button
                icon={view === "list" ? ListViewIcon : GridViewIcon}
                className="p-2"
                aria-label="Edit"
                onClick={handleChangeView}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Product Views */}
      {view === "list" ? (
        <>
          <ProductListView
            productData={productData}
            resultsPerPage={resultsPerPage}
            totalResults={totalResults}
            filter={filter}
            filterStatus={statusFilter}
          />
        </>
      ) : (
        <>
          {/* Car list */}
          <ProductGridView
            productData={productData}
            resultsPerPage={resultsPerPage}
            totalResults={totalResults}
            filter={filter}
            filterStatus={statusFilter}
          />
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  isLoadingProducts: () => dispatch(loadProducts()),
  isProductRequested: () => dispatch(productRequested())
})

const mapStateToProps = (state) => ({
  productData: getProducts(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAll);
