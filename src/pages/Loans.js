import React, { useEffect } from "react";
import { connect } from 'react-redux'
import PageTitle from "../components/Typography/PageTitle";
import LoansTable from "../components/LoansTable";
import { getUsers, loadUsers, getResponse, requestBlock } from "../store/entities/users";


const Customers = (props) => {
  const { loans, serverResponse, isRequested } = props



  useEffect(() => {
    props.isLoadUsers()

  }, []);

  return (
    <div>
      <PageTitle>Manage Loans</PageTitle>


      <LoansTable resultsPerPage={10} loansData={loans} requestBlock={(data, id) => isRequested(data, id)} response={serverResponse} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  isLoadLoans: () => dispatch(loadLoans()),
  isRequested: (data, id) => dispatch(requestBlock(data, id))
})

const mapStateToProps = (state) => ({
  loans: getUsers(state),
  serverResponse: getResponse(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
