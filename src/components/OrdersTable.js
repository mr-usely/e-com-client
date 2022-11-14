import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
} from "@windmill/react-ui";
import RoundIcon from "./RoundIcon";
import { UserIcon } from "../icons";

const OrdersTable = ({ resultsPerPage, filter, ordersData }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const totalResults = ordersData.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    // If Filters Applied
    if (filter === "paid") {
      setData(
        ordersData
          .filter((order) => order.status === "Paid")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "un-paid") {
      setData(
        ordersData
          .filter((order) => order.status === "Un-paid")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "completed") {
      setData(
        ordersData
          .filter((order) => order.status === "Completed")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }

    // if filters dosent applied
    if (filter === "all" || !filter) {
      setData(
        ordersData.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
  }, [page, resultsPerPage, filter, ordersData]);

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {ordersData && data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <RoundIcon
                      icon={UserIcon}
                      iconColorClass="text-orange-500 dark:text-orange-100"
                      bgColorClass="bg-orange-100 dark:bg-orange-500"
                      className="mr-3"
                    />
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user?._id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">₱ {user?.total}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      user?.status === "Un-paid"
                        ? "danger"
                        : user?.status === "Paid"
                          ? "success"
                          : user?.status === "Completed"
                            ? "warning"
                            : "neutral"
                    }
                  >
                    {user?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user?.createdAt).toLocaleDateString()}
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

export default OrdersTable;
