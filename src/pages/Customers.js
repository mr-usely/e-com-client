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
import { getUsers, loadUsers, requestBlock } from "../store/entities/users";


const Customers = (props) => {
  const { user, isRequested } = props



  useEffect(() => {
    props.isLoadUsers()

  }, []);

  return (
    <div>
      <PageTitle>Manage Customers</PageTitle>


      <UsersTable resultsPerPage={10} userData={user} requestBlock={(data, id) => isRequested(data, id)} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  isLoadUsers: () => dispatch(loadUsers()),
  isRequested: (data, id) => dispatch(requestBlock(data, id))
})

const mapStateToProps = (state) => ({
  user: getUsers(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
