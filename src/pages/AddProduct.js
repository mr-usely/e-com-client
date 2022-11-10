import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import http from '../http/api'
import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import InsertProduct from "../components/InsertProduct"
import {
  HomeIcon,
  PublishIcon,
  StoreIcon,
  EditIcon,
  TrashIcon
} from "../icons";
import {
  Card,
  CardBody,
  Label,
  Button,
  Select,
  Badge
} from "@windmill/react-ui";
import { getProducts, productRequested, updateProduct, clearProductResponse } from "../store/entities/products";
import { connect } from "react-redux";

const FormTitle = ({ children }) => {
  return (
    <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  );
};

const AddProduct = (props) => {

  const [edit, setEdit] = useState(false)
  var { productPrev } = props

  useEffect(()=> {
  }, [productPrev])

  // Delete action model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  const [delId, setDelId] = useState("")

  function openModal(productId) {
    setSelectedDeleteProduct(productPrev);
    setDelId(productPrev._id)
    setIsModalOpen(true);
  }

  const deleteItem = async () => {
    const res = await http.delete(`/products/delete/${delId}`)
    console.log(res.data)
    closeModal()
    props.isClearData()
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleCategories = (categoryItem) => {
    if(productPrev != null) {
      const category = { ...productPrev}

      if(categoryItem == "All"){
        category.category = "none"
      }

      if(categoryItem == "Fertilizer") {
        category.category = "fertilizer"
      }

      if(categoryItem == "Seedlings") {
        category.category = "seedlings"
      }

      if(categoryItem == "Insecticide") {
        category.category = "insecticide"
      }
      
      productPrev = category
    }
  }

  const buttonPublish = () => {
    if(productPrev._id) {
      const data = { ...productPrev }
      data.status = "publish"
      props.isUpdateProduct(data, data._id, true)
      props.isClearData()
    }
  }

  const buttonDraft = () => {
    if(productPrev._id) {
      const data = { ...productPrev }
      data.status = "draft"
      props.isUpdateProduct(data, data._id, true)
      props.isClearData()
    }
  }

  const buttonEdit = () => {
    setEdit(true)
  }


  return (
    <div>

      {/* Delete product model */}
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        confirmDelete={deleteItem}
        selectedProduct={selectedDeleteProduct}
      />

      <PageTitle>Add New Product</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-green-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Add new Product</p>
      </div>

      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-3 ">
        <InsertProduct isEdit={edit} prodData={productPrev} />

        <Card className="h-48">
          <CardBody>
            <div className="flex mb-8">
              <Button
                layout="primary"
                className="mr-3"
                iconLeft={PublishIcon}
                onClick={buttonPublish}
              >
                Publish
              </Button>
              <Button layout="link" iconLeft={StoreIcon} onClick={buttonDraft}>
                Save as Draft
              </Button>
            </div>
            <Label className="mt-4">
              <FormTitle>Select Product Category</FormTitle>
              <Select className="mt-1" onChange={(e) => handleCategories(e.target.value)}>
                <option>All</option>
                <option>Fertilizer</option>
                <option>Seedlings</option>
                <option>Insecticide</option>
              </Select>
            </Label>
          </CardBody>
        </Card>

        {productPrev.name && <Card>
          <img 
            className="object-cover w-full"
            src={productPrev?.image}
            alt="product preview"
          />
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold truncate text-gray-600 dark:text-gray-300">
                {productPrev?.name}
              </p>
              <Badge className="whitespace-nowrap" type={productPrev?.qty > 0 ? `success` : "danger"} >
                <p className="break-normal">
                  {productPrev?.qty > 0 ? `In Stock` : "Out of Stock"}
                </p>
              </Badge>
            </div>

            <p className="mb-2 text-purple-500 font-bold text-lg">{productPrev?.price}</p>

            <p className="mb-8 text-gray-600 dark:text-gray-400">
              {productPrev?.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <Button
                  icon={EditIcon}
                  className="mr-3"
                  layout="outline"
                  aria-label="Edit"
                  size="small"
                  onClick={() => buttonEdit()}
                />
                <Button
                  icon={TrashIcon}
                  layout="outline"
                  aria-label="Delete"
                  onClick={() => openModal(1)}
                  size="small"
                />
              </div>
            </div>
          </CardBody>
        </Card>}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  isRequested: () => dispatch(productRequested()),
  isUpdateProduct: (data, id, publish) => dispatch(updateProduct(data, id, publish)),
  isClearData: () => dispatch(clearProductResponse())
});

const mapStateToProps = (state) => ({
  productPrev: getProducts(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
