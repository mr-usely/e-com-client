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

const ModelUser = ({ isModalOpen, closeModal, confirmBlock, userData }) => {
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalHeader className="flex items-center">
                {/* <div className="flex items-center"> */}
                <Icon icon={UserIcon} className="w-6 h-6 mr-3" />
                Preview User
                {/* </div> */}
            </ModalHeader>
            <ModalBody>
                Make sure you want to {userData.firstName}
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
                    <Button onClick={() => confirmBlock()}>Block</Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline" onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large" onClick={() => confirmBlock()}>
                        Block
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    )
}


export default ModelUser