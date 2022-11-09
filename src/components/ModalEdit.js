import React from 'react'
import { connect } from "react-redux";
import Icon from "./Icon";
import http from "../http/api"
import { EditIcon } from "../icons";
import ProductForm from "./Shared/ProductForm";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "@windmill/react-ui";
import { productRequested, updatedProduct } from "../store/entities/products";

const FormTitle = ({ children }) => {
    return (
        <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
        {children}
        </h2>
    );
};

class ModalEdit extends ProductForm {

    state = {
        data: {
            name: "",
            image: "",
            shortDescription: "",
            featureDescription: "",
            price: "",
            qty: 0,
            status: "publish",
            category: "none"
        }
    }

    base64 = {
        url: ""
    }
    
    changeHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            const base64String = reader.result.replace('data:','').replace(/^.+,/, '')
            const imgUrl = this.base64
            imgUrl.url = base64String
            this.setState({ imgUrl })
            this.uploadImage()
        }
        reader.readAsDataURL(file)
    }

    uploadImage = async () => {
        try {
            const myForm = new FormData()
            myForm.append('image', this.base64.url)

            const res = await http.post(
                'https://api.imgbb.com/1/upload?key=5b910794597c67a7c9f90293f625c7e1',
                myForm, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })

            const resdata = res.data
            const stateData = this.state.data
            stateData.image = resdata.data.image.url.toString()
            this.setState({ stateData })
            
            if(stateData.image != '') {
                return stateData.image
            }
        } catch (err) {
            console.error(err.message)
        }
    }

  handleSubmit = async (e) => {
    e.preventDefault()
    
    this.props.isRequested()
    this.state.data.status = "publish"
    this.setState(this.state.data)
    
    if(this.state.data.image != "") {
        this.props.isEditProduct(this.state.data, this.props.data._id)
    }

    this.setState(this.props.isModalClose)
  }
 
  componentDidUpdate(prevProps){
    if(this.props.data !== prevProps.data) {
        this.state.data = this.props.data
        this.setState(this.state.data)
    }
  }

  render(){
    return (
        <Modal isOpen={this.props.isModalOpen} onClose={this.props.isModalClose}>
            <form onSubmit={this.handleSubmit}>
                <ModalHeader className="flex items-center mb-4">
                    {/* <div className="flex items-center"> */}
                    <Icon icon={EditIcon} className="w-5 h-5 mr-3" />
                    Edit Product
                    {/* </div> */}
                </ModalHeader>
                <ModalBody>
                    <FormTitle>Product Image</FormTitle>
                    <input
                        type="file"
                        onChange={this.changeHandler}
                        className="mb-4 text-gray-800 dark:text-gray-300"
                    />

                    <FormTitle>Select Product Category</FormTitle>
                    {this.renderSelectCategory("category")}

                    <FormTitle>Product Name</FormTitle>
                    {this.renderInput("name", "Type product name here")}

                    <FormTitle>Product Price</FormTitle>
                    {this.renderInput("price", "Enter product price here")}

                    <FormTitle>Short Description</FormTitle>
                    {this.renderTextArea("shortDescription", "Enter product short description here", "3")}

                    <FormTitle>Stock Quantity</FormTitle>
                    {this.renderInput("qty", "Enter product quantity")}

                    <FormTitle>Full Description</FormTitle>
                    {this.renderTextArea("featureDescription", "Enter product full description here", "5")}

                </ModalBody>
                <ModalFooter>
                    {/* I don't like this approach. Consider passing a prop to ModalFooter
                    * that if present, would duplicate the buttons in a way similar to this.
                    * Or, maybe find some way to pass something like size="large md:regular"
                    * to Button
                    */}
                    <div className="hidden sm:block">
                        <Button layout="outline" onClick={this.props.isModalClose}>
                            Cancel
                        </Button>
                    </div>
                    <div className="hidden sm:block">
                        {this.renderButton("Publish & Update", false, false)}
                    </div>
                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={this.props.isModalClose}>
                            Cancel
                        </Button>
                    </div>
                    <div className="block w-full sm:hidden">
                        {this.renderButton("Publish & Update", "",false, false)}
                    </div>
                </ModalFooter>
            </form>
        </Modal>
    )
   }
}

const mapDispatchToProps = (dispatch) => ({
    isRequested: () => dispatch(productRequested()),
    isEditProduct: (data, id) => dispatch(updatedProduct(data, id))
});

export default connect(null, mapDispatchToProps)(ModalEdit)