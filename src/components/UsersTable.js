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
  UserIcon, EditIcon,
  EyeIcon,
  TrashIcon,
} from "../icons";
import ModelUser from "./ModelUser";
import ModalComponent from "./Modal";

const UsersTable = ({ resultsPerPage, filter, userData, requestBlock, response }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isOpenPreviewModel, setOpenPreviewModel] = useState(false);
  const [isOpenDelModel, setOpenDelModel] = useState(false);
  const [delId, setDelId] = useState("")
  const [userName, setUserName] = useState("")
  const [user, setUser] = useState([]);



  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(userData?.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage, userData]);

  // pagination setup
  const totalResults = userData?.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  const deleteUser = async () => {
    const res = await http.delete(`/user/delete/${delId}`)
    console.log(res.data)
    closeDelModal()
  }

  const isBlockUser = async () => {
    const data = { status: "Block" }
    requestBlock(data, user._id)
    closeModal()
    console.log(response)
  }

  const openModal = (userId) => {
    let userD = userData.filter((user) => user._id === userId)[0];
    setDelId(userD._id)
    setUserName(userD.firstName)
    setOpenDelModel(true)
  }

  const closeDelModal = () => {
    setOpenDelModel(false)
  }

  const closeModal = () => {
    setOpenPreviewModel(false);
  }

  const openPreviewModal = (userId) => {
    let userD = userData.filter((user) => user._id === userId)[0];
    setUser(userD)
    setOpenPreviewModel(true);
  }

  return (
    <div>

      <ModelUser
        isModalOpen={isOpenPreviewModel}
        closeModal={closeModal}
        confirmBlock={isBlockUser}
        userData={user}
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
              <TableCell>Email</TableCell>
              <TableCell>Joined on</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {userData && data.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <RoundIcon
                      icon={UserIcon}
                      iconColorClass="text-orange-500 dark:text-orange-100"
                      bgColorClass="bg-orange-100 dark:bg-orange-500"
                      className="mr-3"
                    />
                    <div>
                      <p className="font-semibold">{user.firstName} {user.lastName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.status}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Button
                      icon={EyeIcon}
                      className="mr-3"
                      onClick={() => openPreviewModal(user._id)}
                      aria-label="Preview"
                    />
                    <Button
                      icon={TrashIcon}
                      layout="outline"
                      onClick={() => openModal(user._id)}
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
    </div>
  );
};



export default UsersTable;
