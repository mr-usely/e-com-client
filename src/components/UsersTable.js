import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
} from "@windmill/react-ui";
import RoundIcon from "./RoundIcon";
import { UserIcon } from "../icons";

const UsersTable = ({ resultsPerPage, filter, userData }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

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

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joined on</TableCell>
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
                      <p className="font-semibold">{user.firstName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.lastName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
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
