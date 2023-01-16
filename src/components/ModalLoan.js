import React from 'react'
import Icon from "./Icon";
import { UserIcon } from "../icons";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@windmill/react-ui";

const ModalLoan = ({ isModalOpen, closeModal, approve, disapprove, loanData }) => {
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader className="flex items-center">
                {/* <div className="flex items-center"> */}
                <Icon icon={UserIcon} className="w-6 h-6 mr-3" />
                Preview Application
                {/* </div> */}
            </ModalHeader>
            <ModalBody>
                <div className='grid xl:grid-cols-2 md:grid-cols-2 gap-4'>
                    <h2 className='mb-1 mt-5 text-sm font-semibold text-gray-600 dark:text-gray-300'>Name: {loanData.name}</h2>
                    <h2 className='mb-1 mt-5 text-sm font-semibold text-gray-600 dark:text-gray-300'>Status: {loanData.status}</h2>
                    <h2 className='mb-5 text-sm font-semibold text-gray-600 dark:text-gray-300'>Age: {loanData.age}</h2>
                    <h2 className='mb-5 text-sm font-semibold text-gray-600 dark:text-gray-300'>Occupation: {loanData.occupation}</h2>
                </div>
                <div className='grid xl:grid-cols-2 md:grid-cols-2 gap-4'>
                    <h2 className='text-sm font-semibold text-gray-600 dark:text-gray-300'>Address: {loanData.address}</h2>
                </div>
                <div className='grid xl:grid-cols-2 md:grid-cols-2 gap-4'>
                    <h2 className='mt-5 text-sm font-semibold text-gray-600 dark:text-gray-300'>Monthly Income: {loanData.monthly}</h2>
                    <h2 className='mt-5 text-sm font-semibold text-gray-600 dark:text-gray-300'>Area: {loanData.area} hectares</h2>
                    <h2 className='text-sm font-semibold text-gray-600 dark:text-gray-300'>Monthly Income: {loanData.monthly}</h2>
                    <h2 className='text-sm font-semibold text-gray-600 dark:text-gray-300'>Loan: {loanData.borrow}</h2>
                </div>
            </ModalBody>
            <ModalFooter>
                {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
                {loanData.status == "Pending" ?
                    <>
                        <div className="hidden sm:block">
                            <Button layout="outline" onClick={() => disapprove()}>
                                Disapprove
                            </Button>
                        </div>
                        <div className="hidden sm:block">
                            <Button onClick={() => approve()}>Approve</Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={() => disapprove()}>
                                Disapprove
                            </Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large" onClick={() => approve()}>
                                Approve
                            </Button>
                        </div>
                    </> : <></>}
            </ModalFooter>
        </Modal>
    )
}


export default ModalLoan