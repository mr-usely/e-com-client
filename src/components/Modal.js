import React from 'react'
import Icon from "./Icon";
import { TrashIcon } from "../icons";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";

const ModalComponent = ({ isModalOpen, closeModal, confirmDelete, name }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader className="flex items-center">
        {/* <div className="flex items-center"> */}
        <Icon icon={TrashIcon} className="w-6 h-6 mr-3" />
        Delete Product
        {/* </div> */}
      </ModalHeader>
      <ModalBody>
        Make sure you want to delete "{name}"
      </ModalBody>
      <ModalFooter>
        {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
        <div className="hidden sm:block">
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div className="hidden sm:block">
          <Button onClick={() => confirmDelete()}>Delete</Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={closeModal}>
            Cancel
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" onClick={() => confirmDelete()}>
            Delete
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}


export default ModalComponent