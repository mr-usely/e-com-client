import React, { useEffect } from "react";
import { connect } from 'react-redux'
import PageTitle from "../components/Typography/PageTitle";
import LoansTable from "../components/LoansTable";
import { getUsers, loadUsers, getResponse, requestBlock } from "../store/entities/users";


const Customers = (props) => {
  const { user, serverResponse, isRequested } = props



  useEffect(() => {
    props.isLoadUsers()

  }, []);

  return (
    <div>
      <PageTitle>Manage Loans</PageTitle>


      <LoansTable resultsPerPage={10} userData={user} requestBlock={(data, id) => isRequested(data, id)} response={serverResponse} />
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
