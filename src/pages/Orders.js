import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { NavLink } from "react-router-dom";
import { HomeIcon, StoreIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import { Card, CardBody, Label, Select } from "@windmill/react-ui";
import { getOrders, loadOrders } from "../store/entities/orders";
import { getResponse, loadSummaryDay } from "../store/entities/summary";
import OrdersTable from "../components/OrdersTable";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Orders = (props) => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [filter, setFilter] = useState("all");
  const { orders, summary } = props

  useEffect(() => {
    props.isLoadOrders()
    props.isLoadSummaryDay()
  }, [props]);

  const handleFilter = (filter_name) => {
    // console.log(filter_name);
    if (filter_name === "All") {
      setFilter("all");
    }
    if (filter_name === "Un-Paid Orders") {
      setFilter("un-paid");
    }
    if (filter_name === "Paid Orders") {
      setFilter("paid");
    }
    if (filter_name === "Completed") {
      setFilter("completed");
    }
  };

  return (
    <div>
      <PageTitle>Summary Per Day</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Sold Per Day" value={"₱ " + summary.day?.toLocaleString("en-US")}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Sold in Insecticide" value={"₱ " + summary.insecticide?.toLocaleString("en-US")}>
          <RoundIcon
            icon={StoreIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Sold in Fertilizer" value={"₱ " + summary.fertilizer?.toLocaleString("en-US")}>
          <RoundIcon
            icon={StoreIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Sold in Seedlings" value={"₱ " + summary.seedlings?.toLocaleString("en-US")}>
          <RoundIcon
            icon={StoreIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>


      <PageTitle>Orders</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-green-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Orders</p>
      </div>

      {/* Sort */}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Filter Orders
            </p>

            <Label className="mx-3">
              <Select
                className="py-3"
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option>All</option>
                <option>Un-Paid Orders</option>
                <option>Paid Orders</option>
                <option>Completed</option>
              </Select>
            </Label>

            <Label className="">
              {/* <!-- focus-within sets the color for the icon when input is focused --> */}
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  value={resultsPerPage}
                  onChange={(e) => setResultPerPage(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  {/* <SearchIcon className="w-5 h-5" aria-hidden="true" /> */}
                  Results on Table
                </div>
              </div>
            </Label>
          </div>
        </CardBody>
      </Card>

      {/* Table */}
      <OrdersTable resultsPerPage={resultsPerPage} filter={filter} ordersData={orders} />
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
  isLoadOrders: () => dispatch(loadOrders()),
  isLoadSummaryDay: () => dispatch(loadSummaryDay())
})

const mapStateToProps = (state) => ({
  orders: getOrders(state),
  summary: getResponse(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
