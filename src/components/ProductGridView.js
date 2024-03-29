import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import http from '../http/api'
import {
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "../icons";
import {
  Card,
  CardBody,
  Button,
  Badge,
  Pagination
} from "@windmill/react-ui";
import ModalEdit from './ModalEdit';
import ModalComponent from "../components/Modal";

const ProductGridView = ({ productData, resultsPerPage, totalResults, filter, filterStatus }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState([])
  const [delId, setDelId] = useState("")
  const [nameData, setNameData] = useState(null);
  const [data, setData] = useState([])

  // Table and grid data handlling
  const [page, setPage] = useState(1);

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  async function openModal(productId) {
    let product = await productData.filter((product) => product._id === productId)[0];
    setNameData(product.name);
    setDelId(product._id)
    setIsModalOpen(true);

  }

  async function openEditModal(productId) {
    let product = await productData.filter((product) => product._id === productId)[0];
    setEditData(product)
    setIsEditModalOpen(true);
  }

  const deleteItem = async () => {
    const res = await http.delete(`/products/delete/${delId}`)
    console.log(res.data)
    closeModal()
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function editModalClose() {
    setIsEditModalOpen(false);
  }

  useEffect(() => {

    if (filter == "all") {
      setData(
        productData
          .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    } else if (filter == "fertilizer") {
      setData(
        productData
          .filter((prod) => prod.status === filterStatus)
          .filter((prod) => prod.category === filter)
          .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    } else if (filterStatus == "unpublish") {
      setData(
        productData
          .filter((prod) => prod.status === filterStatus)
          .filter((prod) => prod.category === filter)
          .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    } else if (filterStatus == "publish") {
      setData(
        productData
          .filter((prod) => prod.status === filterStatus)
          .filter((prod) => prod.category === filter)
          .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    } else if (filterStatus == "draft") {
      setData(
        productData
          .filter((prod) => prod.status === filterStatus)
          .filter((prod) => prod.category === filter)
          .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    }
  }, [page, resultsPerPage, productData, filter, filterStatus])

  return (
    <>
      <ModalComponent
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        confirmDelete={deleteItem}
        name={nameData}
      />

      <ModalEdit
        isModalOpen={isEditModalOpen}
        isModalClose={editModalClose}
        data={editData}
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
        {productData && data.map((product) => (
          <div className="" key={product._id}>
            <Card>
              <img
                className="object-cover w-full"
                src={product.image}
                alt="product"
              />
              <CardBody>
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-semibold truncate  text-gray-600 dark:text-gray-300">
                    {product.name}
                  </p>
                  <div className='justify-left'>
                    <Badge
                      type={product.qty > 0 ? "success" : "danger"}
                      className="whitespace-nowrap"
                    >
                      <p className="break-normal">
                        {product.qty > 0 ? `In Stock` : "Out of Stock"}
                      </p>
                    </Badge>
                    <Badge
                      type={(product.stat == null || product.stat == "Not Active") ? "danger" : "success"}
                      className="whitespace-nowrap"
                    >
                      <p className="break-normal">
                        {(product.stat == null || product.stat == "Not Active") ? "Not Active" : "Active"}
                      </p>
                    </Badge>
                  </div>

                </div>

                <p className="mb-2 text-green-500 font-bold text-lg">
                  ₱{product.price}
                </p>

                <p className="mb-8 text-gray-600 dark:text-gray-400">
                  {product.shortDescription}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <Link to={`/app/product/${product._id}`}>
                      <Button
                        icon={EyeIcon}
                        className="mr-3"
                        aria-label="Preview"
                        size="small"
                      />
                    </Link>
                  </div>
                  <div>
                    <Button
                      icon={EditIcon}
                      className="mr-3"
                      layout="outline"
                      onClick={() => openEditModal(product._id)}
                      aria-label="Edit"
                      size="small"
                    />
                    <Button
                      icon={TrashIcon}
                      layout="outline"
                      aria-label="Delete"
                      onClick={() => openModal(product._id)}
                      size="small"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}

      </div>
      <Pagination
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        label="Table navigation"
        onChange={onPageChange}
      />
    </>
  )
}

export default ProductGridView