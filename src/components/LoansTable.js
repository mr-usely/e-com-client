import React, { useState, useEffect } from "react";
import http from '../http/api'

import {
  TableBody,
  Button,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from "@windmill/react-ui";
import RoundIcon from "./RoundIcon";
import {
  UserIcon,
  EyeIcon,
  TrashIcon,
} from "../icons";
import ModalLoan from "./ModalLoan";
import ModalComponent from "./Modal";

const UsersTable = ({ resultsPerPage, filter, loansData, request }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpenPreviewModel, setOpenPreviewModel] = useState(false);
  const [isOpenDelModel, setOpenDelModel] = useState(false);
  const [delId, setDelId] = useState("")
  const [userName, setUserName] = useState("")
  const [loan, setLoan] = useState([]);



  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    console.log(loansData)
    setData(loansData?.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage, loansData]);

  // pagination setup
  const totalResults = loansData?.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  const deleteUser = async () => {
    const res = await http.delete(`/loan/delete/${delId}`)
    console.log(res.data)
    closeDelModal()
  }

  const isApproveLoan = async () => {
    const data = { status: "Approve" }
    request(data, loan._id)

    closeModal()

  }

  const isDisapproveLoan = async () => {
    const data = { status: "Disapprove" }
    request(data, loan._id)
    closeModal()

  }

  const openModal = (loanId) => {
    let loan = loansData.filter((loan) => loan._id === loanId)[0];
    setDelId(loan._id)
    setUserName(loan.name)
    setOpenDelModel(true)
  }

  const closeDelModal = () => {
    setOpenDelModel(false)
  }

  const closeModal = () => {
    setOpenPreviewModel(false);
  }

  const openPreviewModal = (loanId) => {
    let loan = loansData.filter((loan) => loan._id === loanId)[0];
    setLoan(loan)
    setOpenPreviewModel(true);
  }

  return (
    <div>

      <ModalLoan
        isModalOpen={isOpenPreviewModel}
        closeModal={closeModal}
        approve={isApproveLoan}
        disapprove={isDisapproveLoan}
        loanData={loan}
      />

      <ModalComponent
        isModalOpen={isOpenDelModel}
        closeModal={closeDelModal}
        confirmDelete={deleteUser}
        name={userName}
      />


      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Borrow</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {loansData && data.map((loan) => (
              <TableRow key={loan._id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <RoundIcon
                      icon={UserIcon}
                      iconColorClass="text-orange-500 dark:text-orange-100"
                      bgColorClass="bg-orange-100 dark:bg-orange-500"
                      className="mr-3"
                    />
                    <div>
                      <p className="font-semibold">{loan.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{loan.status}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{loan.borrow}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {new Date(loan.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Button
                      icon={EyeIcon}
                      className="mr-3"
                      onClick={() => openPreviewModal(loan._id)}
                      aria-label="Preview"
                    />
                    {/* <Button
                      icon={TrashIcon}
                      layout="outline"
                      onClick={() => openModal(loan._id)}
                      aria-label="Delete"
                    /> */}
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
    </div>
  );
};



export default UsersTable;
