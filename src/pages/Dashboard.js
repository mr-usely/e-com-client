import React, { useEffect } from "react";
import { connect } from 'react-redux'

import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { StoreIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";


import { getOrders, loadOrders } from "../store/entities/orders";
import { getResponse, loadDashboard } from "../store/entities/summary";
import OrdersTable from "../components/OrdersTable";

function Dashboard(props) {
  const { orders, dashboardData } = props


  useEffect(() => {
    props.isLoadOrders()
    props.isLoadDashboardData()
  }, [])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total customers" value={dashboardData.total_users}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total income" value={"₱ " + dashboardData.total_sold?.toLocaleString("en-US")}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Orders" value={dashboardData.total_orders}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Products" value={dashboardData.total_products}>
          <RoundIcon
            icon={StoreIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      {/* <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="User Analytics">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>
      </div> */}

      <PageTitle>Orders</PageTitle>
      <OrdersTable resultsPerPage={10} ordersData={orders} />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  isLoadOrders: () => dispatch(loadOrders()),
  isLoadDashboardData: () => dispatch(loadDashboard())
})

const mapStateToProps = (state) => ({
  orders: getOrders(state),
  dashboardData: getResponse(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
