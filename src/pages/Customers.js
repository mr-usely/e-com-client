import React, { useEffect } from "react";
import { connect } from 'react-redux'
import PageTitle from "../components/Typography/PageTitle";
import ChartCard from "../components/Chart/ChartCard";
import { Line, Bar } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import {
  lineOptions,
  lineLegends,
  realTimeUsersBarLegends,
  realTimeUsersBarOptions,
} from "../utils/demo/chartsData";
import UsersTable from "../components/UsersTable";
import { getUsers, loadUsers, getResponse, requestBlock } from "../store/entities/users";


const Customers = (props) => {
  const { user, serverResponse, isRequested } = props



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

      <UsersTable resultsPerPage={10} userData={user} requestBlock={(data, id) => isRequested(data, id)} res={serverResponse} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  isLoadUsers: () => dispatch(loadUsers()),
  isRequested: (data, id) => dispatch(requestBlock(data, id))
})

const mapStateToProps = (state) => ({
  user: getUsers(state),
  serverResponse: getResponse(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
