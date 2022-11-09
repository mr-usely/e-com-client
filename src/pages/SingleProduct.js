import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";
import response from "../utils/demo/productData";
import { getProducts } from "../store/entities/products";
import { Card, CardBody, Badge, Button, Avatar } from "@windmill/react-ui";
import { genRating } from "../utils/genarateRating";

const SingleProduct = (props) => {
  const { id } = useParams();
  const {productData} = props
  // change view component
  const [tabView, setTabView] = useState("reviews");
  const handleTabView = (viewName) => setTabView(viewName);
  
  //   get product
  let product = productData.filter((product) => product._id == id)[0];

  return (
    <div>
      <PageTitle>Product Details</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-green-600">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Dashboard
          </NavLink>
        </div>
        {">"}
        <NavLink exact to="/app/all-products" className="mx-2 text-green-600">
          All Products
        </NavLink>
        {">"}
        <p className="mx-2">{productData.name}</p>
      </div>

      {/* Product overview  */}
      <Card className="my-8 shadow-md">
        <CardBody>
          <div className="grid grid-col items-center md:grid-cols-2 lg:grid-cols-2">
            <div>
              <img src={product?.image} alt="" className="w-full rounded-lg" />
            </div>

            <div className="mx-8 pt-5 md:pt-0">
              <h1 className="text-3xl mb-4 font-semibold text-gray-700 dark:text-gray-200">
                {product?.name}
              </h1>

              <Badge
                type={product?.qty > 0 ? "success" : "danger"}
                className="mb-2"
              >
                <p className="break-normal">
                  {product?.qty > 0 ? `In Stock` : "Out of Stock"}
                </p>
              </Badge>

              <p className="mb-2 text-sm text-gray-800 dark:text-gray-300">
                {product?.shortDescription}
              </p>
              <p className="mb-3 text-sm text-gray-800 dark:text-gray-300">
                {product?.featureDescription}
              </p>

              <p className="text-sm text-gray-900 dark:text-gray-400">
                Product Rating
              </p>
              <div>{genRating(0, 0, 6)}</div>

              <h4 className="mt-4 text-green-600 text-2xl font-semibold">
                {product?.price}
              </h4>
              <p className="text-sm text-gray-900 dark:text-gray-400">
                Product Quantity : {product?.qty}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Product Reviews and Description */}
      <Card className="my-8 shadow-md">
        <CardBody>
          {/* Navigation Area */}
          <div className="flex items-center">
            <Button
              className="mx-5"
              layout="link"
              onClick={() => handleTabView("reviews")}
            >{`Reviews (0)`}</Button>
            <Button layout="link" onClick={() => handleTabView("description")}>
              Description
            </Button>
          </div>

          {/* Divider */}
          <hr className="mx-3 my-2 customeDivider" />

          {/* Component area */}
          <div className="mx-3 mt-4">
            {tabView === "reviews" ? (
              <>
                <p className="text-5xl text-gray-700 dark:text-gray-200">
                  no reviews
                </p>
                {genRating(0, 0, 6)}

                <div className="mt-4">
                  {/* {product.reviews.map((review, i) => (
                    <div className="flex py-3" key={i}>
                      <Avatar
                        className="hidden mr-3 md:block"
                        size="large"
                        src={review.avatar_url}
                        alt="User image"
                      />
                      <div>
                        <p className="font-medium text-lg text-gray-800 dark:text-gray-300">
                          {review.username}
                        </p>
                        {genRating(review.rate, null, 4)}
                        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                          {review.review}
                        </p>
                      </div>
                    </div>
                  ))} */}
                </div>
              </>
            ) : tabView === "description" ? (
              <>
                <div className="px-3">
                  <p className="text-sm text-gray-800 dark:text-gray-300">
                    {product.featureDescription}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productData: getProducts(state)
})

export default connect(mapStateToProps)(SingleProduct);
