import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PaymentForm from "./Payment";

const BillingForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address1: "",
      address2: "",
      state: "",
      country: "",
      zip: "",
      shippingSameAsBilling: false,
      saveForNextTime: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phone: Yup.string().optional(),
      address1: Yup.string().required("Address Line 1 is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      zip: Yup.string().required("ZIP/Postal Code is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <section className="flex flex-col p-5 lg:p-0">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-[var(--nav-color)] p-6  rounded-lg max-w-4xl  text-gray-200 border border-solid border-gray-600"
      >
        <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...formik.getFieldProps("firstName")}
              className={`w-full px-4 py-2 bg-[#0f0f1f] rounded border ${
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-500"
                  : "border-gray-600"
              }`}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.firstName}
              </p>
            ) : null}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...formik.getFieldProps("lastName")}
              className={`w-full px-4 py-2 bg-[#0f0f1f] rounded border ${
                formik.touched.lastName && formik.errors.lastName
                  ? "border-red-500"
                  : "border-gray-600"
              }`}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.lastName}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm mb-1" htmlFor="phone">
            Phone Number (Optional)
          </label>
          <input
            type="text"
            id="phone"
            {...formik.getFieldProps("phone")}
            className="w-full px-4 py-2 bg-[#0f0f1f] rounded border border-gray-600"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm mb-1" htmlFor="address1">
            Address Line 1
          </label>
          <input
            type="text"
            id="address1"
            {...formik.getFieldProps("address1")}
            className={`w-full px-4 py-2 bg-[#0f0f1f] rounded border ${
              formik.touched.address1 && formik.errors.address1
                ? "border-red-500"
                : "border-gray-600"
            }`}
          />
          {formik.touched.address1 && formik.errors.address1 ? (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.address1}
            </p>
          ) : null}
        </div>
        <div className="mt-4">
          <label className="block text-sm mb-1" htmlFor="address2">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            id="address2"
            {...formik.getFieldProps("address2")}
            className="w-full px-4 py-2 bg-[#0f0f1f] rounded border border-gray-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="state">
              State
            </label>
            <select
              id="state"
              {...formik.getFieldProps("state")}
              className={`w-full px-4 py-2 bg-[#0f0f1f] rounded border ${
                formik.touched.state && formik.errors.state
                  ? "border-red-500"
                  : "border-gray-600"
              }`}
            >
              <option value="" label="Select State" />
              <option value="state1" label="State 1" />
              <option value="state2" label="State 2" />
            </select>
            {formik.touched.state && formik.errors.state ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              {...formik.getFieldProps("country")}
              className={`w-full px-4 py-2 bg-[#0f0f1f] rounded border ${
                formik.touched.country && formik.errors.country
                  ? "border-red-500"
                  : "border-gray-600"
              }`}
            >
              <option value="" label="Select country" />
              <option value="country1" label="Country 1" />
              <option value="country2" label="Country 2" />
            </select>
            {formik.touched.country && formik.errors.country ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.country}
              </p>
            ) : null}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="zip">
              Zip/Postal Code
            </label>
            <input
              type="text"
              id="zip"
              {...formik.getFieldProps("zip")}
              className={`w-full px-4 py-2 bg-[#0f0f1f] rounded border ${
                formik.touched.zip && formik.errors.zip
                  ? "border-red-500"
                  : "border-gray-600"
              }`}
            />
            {formik.touched.zip && formik.errors.zip ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.zip}</p>
            ) : null}
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <label className="flex items-center cursor-pointer gap-2">
            {formik.values.shippingSameAsBilling ? (
              <div
                className="flex items-center justify-center w-5 h-5 bg-[var(--peach-color)] border-[var(--peach-color)] border-2 rounded-md transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() =>
                  formik.setFieldValue("shippingSameAsBilling", false)
                }
              >
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-5 h-5 border-2 border-gray-400 rounded-md transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() =>
                  formik.setFieldValue("shippingSameAsBilling", true)
                }
              />
            )}
            <span className="text-gray-200 text-wrap text-xs md:text-sm lg:text-sm xl:text-sm">
              Shipping address is the same as my billing address
            </span>
          </label>
          <label className="flex items-center cursor-pointer gap-2">
            {formik.values.saveForNextTime ? (
              <div
                className="flex items-center justify-center w-5 h-5 bg-[var(--peach-color)] border-[var(--peach-color)] border-2 rounded-md transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => formik.setFieldValue("saveForNextTime", false)}
              >
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-5 h-5 border-2 border-gray-400 rounded-md transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => formik.setFieldValue("saveForNextTime", true)}
              />
            )}
            <span className="text-gray-200 text-wrap text-xs md:text-sm lg:text-sm xl:text-sm">
              Save this information for next time
            </span>
          </label>
        </div>
      </form>
      <PaymentForm />
    </section>
  );
};

export default BillingForm;
