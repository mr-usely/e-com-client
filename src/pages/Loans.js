import React, { useEffect } from "react";
import { connect } from 'react-redux'
import PageTitle from "../components/Typography/PageTitle";
import LoansTable from "../components/LoansTable";
import { getLoans, loadLoans, requestApproval } from "../store/entities/loans";


const Loans = (props) => {
  const { loans, isRequested, response } = props

  useEffect(() => {
    props.isLoadLoans()

  }, []);

  return (
    <div>
      <PageTitle>Manage Loans</PageTitle>


      <LoansTable resultsPerPage={10} loansData={loans} request={(data, id) => isRequested(data, id)} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  isLoadLoans: () => dispatch(loadLoans()),
  isRequested: (data, id) => dispatch(requestApproval(data, id))
})

const mapStateToProps = (state) => ({
  loans: getLoans(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Loans);
