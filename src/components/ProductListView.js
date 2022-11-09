import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import http from '../http/api'
import {
  EditIcon,
  EyeIcon,
  TrashIcon,
} from "../icons";
import {
  Button,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination
} from "@windmill/react-ui";
import ModalComponent from "../components/Modal";
import ModalEdit from './ModalEdit';
import { genRating } from "../utils/genarateRating";

const ProductListView = ({ productData, resultsPerPage, totalResults, filter, filterStatus  }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState([])
  const [delId, setDelId] = useState('')
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState(null);
  const [data, setData] = useState([])

  // Table and grid data handlling
  const [page, setPage] = useState(1);

   // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  async function openModal(productId) {
    let product = await productData.filter((product) => product._id === productId)[0];
    setSelectedDeleteProduct(product);
    setDelId(product._id)
    setIsModalOpen(true);
  }

  async function openEditModal(productId) {
    let product = await productData.filter((product) => product._id === productId)[0];
    setEditData(product)
    setIsEditModalOpen(true);
  }

  const confirmDelete = async () => {
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
    if(filter == "all") {
        setData(
            productData
            .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    } else if (filter == "fertilizer"){
        setData(
            productData
            .filter((prod) => prod.status === filterStatus)
            .filter((prod) => prod.category === filter)
            .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    } else if (filterStatus == "unpublish"){
        setData(
            productData
            .filter((prod) => prod.status === filterStatus)
            .filter((prod) => prod.category === filter)
            .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    } else if (filterStatus == "publish"){
        setData(
            productData
            .filter((prod) => prod.status === filterStatus)
            .filter((prod) => prod.category === filter)
            .slice((page - 1) * resultsPerPage, page * resultsPerPage))
    } else if (filterStatus == "draft"){
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
            confirmDelete={confirmDelete}
            selectedProduct={selectedDeleteProduct}
        />

        <ModalEdit
            isModalOpen={isEditModalOpen}
            isModalClose={editModalClose}
            data={editData}
        />

        <TableContainer className="mb-8">
            <Table>
                <TableHeader>
                <tr>
                    <TableCell>Name</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>QTY</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                </tr>
                </TableHeader>
                <TableBody>
                {productData && data.map((product) => (
                    <TableRow key={product._id}>
                    <TableCell>
                        <div className="flex items-center text-sm">
                        <Avatar
                            className="hidden mr-4 md:block"
                            src={product.image}
                            alt="Product image"
                        />
                        <div>
                            <p className="font-semibold">{product.name}</p>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge type={product.qty > 0 ? "success" : "danger"}>
                        {product.qty > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                        {genRating(product.rating, 0, 5)}
                    </TableCell>
                    <TableCell className="text-sm">{product.qty}</TableCell>
                    <TableCell className="text-sm">₱{product.price}</TableCell>
                    <TableCell>
                        <div className="flex">
                        <Link to={`/app/product/${product._id}`}>
                            <Button
                            icon={EyeIcon}
                            className="mr-3"
                            aria-label="Preview"
                            />
                        </Link>
                        <Button
                            icon={EditIcon}
                            className="mr-3"
                            layout="outline"
                            onClick={() => openEditModal(product._id)}
                            aria-label="Edit"
                        />
                        <Button
                            icon={TrashIcon}
                            layout="outline"
                            onClick={() => openModal(product._id)}
                            aria-label="Delete"
                        />
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <TableFooter>
                <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                label="Table navigation"
                onChange={onPageChange}
                />
            </TableFooter>
        </TableContainer>
    </>
  )
}

export default ProductListView