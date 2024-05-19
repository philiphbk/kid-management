"use client";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ParentForm, ChildForm, CaregiverForm } from "@/lib/interfaces";

const AdminRegister = () => {
  const [parentId, setParentId] = useState<string | null>(null);
  const [childId, setChildId] = useState<string | null>(null);

  const parentValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    roleInChurch: Yup.string().required("Role in Church is required"),
    phoneNumberPrimary: Yup.string().required(
      "Primary Phone Number is required"
    ),
    idType: Yup.string().required("ID Type is required"),
    idNumber: Yup.string().required("ID Number is required"),
    address: Yup.string().required("Address is required"),
  });

  const childValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    ageGroup: Yup.string().required("Age Group is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    relationshipWithChildType: Yup.string().required(
      "Relationship with Child Type is required"
    ),
    relationshipWithChild: Yup.string().required(
      "Relationship with Child is required"
    ),
    specialNeeds: Yup.string().required("Special Needs is required"),
  });

  const caregiverValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    roleInChurch: Yup.string().required("Role in Church is required"),
    phoneNumberPrimary: Yup.string().required(
      "Primary Phone Number is required"
    ),
    relationshipWithChildType: Yup.string().required(
      "Relationship with Child Type is required"
    ),
    relationshipWithChild: Yup.string().required(
      "Relationship with Child is required"
    ),
    caregiverRelationshipTypeWithParent: Yup.string().required(
      "Caregiver Relationship Type with Parent is required"
    ),
    caregiverRelationshipWithParentData: Yup.string().required(
      "Caregiver Relationship with Parent Data is required"
    ),
  });

  const registerParent = async (values: ParentForm) => {
    const response = await fetch("/api/register/parent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setParentId(data.parentId);
  };

  const registerChild = async (values: ChildForm) => {
    const response = await fetch("/api/register/child", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, parentId }),
    });
    const data = await response.json();
    setChildId(data.childId);
  };

  const registerCaregiver = async (values: CaregiverForm) => {
    await fetch("/api/register/caregiver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, parentId, childId }),
    });
  };

  return (
    <div>
      <h1>Admin Registration</h1>

      <Formik
        initialValues={{
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          roleInChurch: "",
          departmentInChurch: "",
          ministry: "",
          phoneNumberPrimary: "",
          phoneNumberSecondary: "",
          idType: "",
          idNumber: "",
          idPhoto: null,
          photograph: null,
          address: "",
        }}
        validationSchema={parentValidationSchema}
        onSubmit={registerParent}
      >
        {() => (
          <Form className="mb-8 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Register Parent</h2>
            <div className="mb-4">
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="gender"
                placeholder="Gender"
                className="input"
              />
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="roleInChurch"
                placeholder="Role in Church"
                className="input"
              />
              <ErrorMessage
                name="roleInChurch"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="phoneNumberPrimary"
                placeholder="Primary Phone Number"
                className="input"
              />
              <ErrorMessage
                name="phoneNumberPrimary"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="idType"
                placeholder="ID Type"
                className="input"
              />
              <ErrorMessage
                name="idType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="idNumber"
                placeholder="ID Number"
                className="input"
              />
              <ErrorMessage
                name="idNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="address"
                placeholder="Address"
                className="input"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register Parent
            </button>
          </Form>
        )}
      </Formik>

      {parentId && (
        <Formik
          initialValues={{
            id: "",
            firstName: "",
            lastName: "",
            ageGroup: "",
            gender: "",
            dateOfBirth: "",
            photograph: null,
            relationshipWithChildType: "",
            relationshipWithChild: "",
            specialNeeds: "",
            parentId: parentId,
            caregiverIds: "",
          }}
          validationSchema={childValidationSchema}
          onSubmit={registerChild}
        >
          {() => (
            <Form className="mb-8 p-4 border border-gray-300 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Register Child</h2>
              <div className="mb-4">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="ageGroup"
                  placeholder="Age Group"
                  className="input"
                />
                <ErrorMessage
                  name="ageGroup"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  className="input"
                />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  className="input"
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="relationshipWithChildType"
                  placeholder="Relationship with Child Type"
                  className="input"
                />
                <ErrorMessage
                  name="relationshipWithChildType"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="relationshipWithChild"
                  placeholder="Relationship with Child"
                  className="input"
                />
                <ErrorMessage
                  name="relationshipWithChild"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="specialNeeds"
                  placeholder="Special Needs"
                  className="input"
                />
                <ErrorMessage
                  name="specialNeeds"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register Child
              </button>
            </Form>
          )}
        </Formik>
      )}

      {parentId && childId && (
        <Formik
          initialValues={{
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            roleInChurch: "",
            departmentInChurch: "",
            ministry: "",
            phoneNumberPrimary: "",
            phoneNumberSecondary: "",
            relationshipWithChildType: "",
            relationshipWithChild: "",
            relationshipTypeWithParent: "",
            relationshipWithParent: "",
            photograph: null,
          }}
          validationSchema={caregiverValidationSchema}
          onSubmit={registerCaregiver}
        >
          {() => (
            <Form className="mb-8 p-4 border border-gray-300 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Register Caregiver</h2>
              <div className="mb-4">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="input"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  className="input"
                />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="roleInChurch"
                  placeholder="Role in Church"
                  className="input"
                />
                <ErrorMessage
                  name="roleInChurch"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="phoneNumberPrimary"
                  placeholder="Primary Phone Number"
                  className="input"
                />
                <ErrorMessage
                  name="phoneNumberPrimary"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="relationshipWithChildType"
                  placeholder="Relationship with Child Type"
                  className="input"
                />
                <ErrorMessage
                  name="relationshipWithChildType"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="relationshipWithChild"
                  placeholder="Relationship with Child"
                  className="input"
                />
                <ErrorMessage
                  name="relationshipWithChild"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="caregiverRelationshipTypeWithParent"
                  placeholder="Caregiver Relationship Type with Parent"
                  className="input"
                />
                <ErrorMessage
                  name="caregiverRelationshipTypeWithParent"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="caregiverRelationshipWithParentData"
                  placeholder="Caregiver Relationship with Parent Data"
                  className="input"
                />
                <ErrorMessage
                  name="caregiverRelationshipWithParentData"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register Caregiver
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AdminRegister;
