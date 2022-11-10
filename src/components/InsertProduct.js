import React from "react";
import { connect } from "react-redux";
import ProductForm from "./Shared/ProductForm";
import http from "../http/api"
import { addProduct, productRequested, updateProduct } from "../store/entities/products";
import {Card, CardBody } from "@windmill/react-ui";
  

const FormTitle = ({ children }) => {
    return (
        <h2 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
        {children}
        </h2>
    );
};

class InsertProduct extends ProductForm {
    constructor(props){
        super(props)
    }

    state = {
        data: {
          name: "",
          image: "",
          shortDescription: "",
          featureDescription: "",
          price: "",
          qty: 0,
          status: "unpublish",
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

    clearField = () => {
        this.setState({
            data: {
                name: "",
                image: "",
                shortDescription: "",
                featureDescription: "",
                price: "",
                qty: 0,
                status: "unpublish",
                catergory: "none"
            }
        })
    }

    isEdit = () => {
        return this.props.isEdit
    }

    loadEditData = () => {
        this.state.data = this.props.prodData
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.props.isRequested()
        if(this.state.data.image != '' && this.props.isEdit == false) {

            this.props.isAddProduct(this.state.data)
            this.clearField()

        } else if(this.state.data.image != '' && this.props.isEdit) {
            this.props.isEditProduct(this.state.data, this.props.prodData._id, false)
            this.clearField()
        }
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.isEdit !== prevProps.isEdit) {
          this.state.data = this.props.prodData
          this.setState(this.state.data)
        }
      }


    render() {
        return (
            <Card className="row-span-2 md:col-span-2">
                <CardBody>
                    <form onSubmit={this.handleSubmit}>
                        <FormTitle>Product Image</FormTitle>
                        <input
                            type="file"
                            onChange={this.changeHandler}
                            className="mb-4 text-gray-800 dark:text-gray-300"
                        />

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
                        
                        <div className="w-full">
                            {this.renderButton("Add Product", "", this.state.data.image === "" ? true : false, false)}
                        </div>
                    </form>
                </CardBody>
            </Card>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    isRequested: () => dispatch(productRequested()),
    isAddProduct: (data) => dispatch(addProduct(data)),
    isEditProduct: (data, id, publish) => dispatch(updateProduct(data, id, publish))
});

export default connect(null, mapDispatchToProps)(InsertProduct);