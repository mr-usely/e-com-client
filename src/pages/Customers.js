import React, { useEffect } from "react";
import { connect } from 'react-redux'
import PageTitle from "../components/Typography/PageTitle";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import {
  lineOptions,
  lineLegends,
  realTimeUsersBarLegends,
  realTimeUsersBarOptions,
} from "../utils/demo/chartsData";
import UsersTable from "../components/UsersTable";
import { getUsers, loadUsers } from "../store/entities/users";


const Customers = (props) => {
  const { user } = props

  useEffect(() => {
    props.isLoadUsers()

  }, []);

  return (
    <div>
      <PageTitle>Manage Customers</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="User Details">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Online Visitors">
          <Bar {...realTimeUsersBarOptions} />
          <ChartLegend legends={realTimeUsersBarLegends} />
        </ChartCard>
      </div>

      <UsersTable resultsPerPage={10} userData={user} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  isLoadUsers: () => dispatch(loadUsers())
})

const mapStateToProps = (state) => ({
  user: getUsers(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
