"use client";

import { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ParentForm, ChildForm, CaregiverForm } from "@/lib/interfaces";

// Validation Schemas
const parentValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  roleInChurch: Yup.string().required("Role in Church is required"),
  phoneNumberPrimary: Yup.string().required("Primary Phone Number is required"),
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
  phoneNumberPrimary: Yup.string().required("Primary Phone Number is required"),
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

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [parentId, setParentId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    parent: ParentForm;
    children: ChildForm[];
    caregivers: CaregiverForm[];
  }>({
    parent: {
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
    },
    children: [
      {
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
        parentId: "",
        caregiverIds: "",
      },
    ],
    caregivers: [
      {
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
      },
    ],
  });

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

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
    setFormData((prev) => ({ ...prev, parent: values }));
    handleNextStep();
  };

  const registerChildren = async (values: ChildForm[]) => {
    const updatedChildren = values.map((child) => ({ ...child, parentId }));
    const response = await fetch("/api/register/children", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedChildren),
    });
    const data = await response.json();
    setFormData((prev) => ({ ...prev, children: values }));
    handleNextStep();
  };

  const registerCaregivers = async (values: CaregiverForm[]) => {
    const updatedCaregivers = values.map((caregiver) => ({
      ...caregiver,
      parentId,
    }));
    await fetch("/api/register/caregivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCaregivers),
    });
    setFormData((prev) => ({ ...prev, caregivers: values }));
    alert("Registration Complete");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Registration</h1>
      {step === 1 && (
        <Formik
          initialValues={formData.parent}
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
                Next
              </button>
            </Form>
          )}
        </Formik>
      )}
      {step === 2 && (
        <Formik
          initialValues={{ children: formData.children }}
          validationSchema={Yup.object().shape({
            children: Yup.array().of(childValidationSchema),
          })}
          onSubmit={(values) => registerChildren(values.children)}
        >
          {({ values }) => (
            <Form className="mb-8 p-4 border border-gray-300 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Register Children</h2>
              <FieldArray name="children">
                {({ insert, remove, push }) => (
                  <div>
                    {values.children.length > 0 &&
                      values.children.map((child, index) => (
                        <div key={index} className="mb-4">
                          <Field
                            type="text"
                            name={`children.${index}.firstName`}
                            placeholder="First Name"
                            className="input"
                          />
                          <ErrorMessage
                            name={`children.${index}.firstName`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`children.${index}.lastName`}
                            placeholder="Last Name"
                            className="input"
                          />
                          <ErrorMessage
                            name={`children.${index}.lastName`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`children.${index}.ageGroup`}
                            placeholder="Age Group"
                            className="input"
                          />
                          <ErrorMessage
                            name={`children.${index}.ageGroup`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`children.${index}.gender`}
                            placeholder="Gender"
                            className="input"
                          />
                          <ErrorMessage
                            name={`children.${index}.gender`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="date"
                            name={`children.${index}.dateOfBirth`}
                            placeholder="Date of Birth"
                            className="input"
                          />
                          <ErrorMessage
                            name={`children.${index}.dateOfBirth`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`children.${index}.relationshipWithChildType`}
                            placeholder="Relationship with Child Type"
                            className="input"
                          />
                          <ErrorMessage
                            name={`children.${index}.relationshipWithChildType`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`children.${index}.relationshipWithChild`}
                            placeholder="Relationship with Child"
                            className="input"
                          />
                          <ErrorMessage
                            name={`children.${index}.relationshipWithChild`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`children.${index}.specialNeeds`}
                            placeholder="Special Needs"
                            className="input"
                          />
                          <ErrorMessage
                            name={`children.${index}.specialNeeds`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <div className="flex justify-between">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() =>
                        push({
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
                          parentId: "",
                          caregiverIds: "",
                        })
                      }
                    >
                      Add Child
                    </button>
                  </div>
                )}
              </FieldArray>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePreviousStep}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {step === 3 && (
        <Formik
          initialValues={{ caregivers: formData.caregivers }}
          validationSchema={Yup.object().shape({
            caregivers: Yup.array().of(caregiverValidationSchema),
          })}
          onSubmit={(values) => registerCaregivers(values.caregivers)}
        >
          {({ values }) => (
            <Form className="mb-8 p-4 border border-gray-300 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Register Caregivers
              </h2>
              <FieldArray name="caregivers">
                {({ insert, remove, push }) => (
                  <div>
                    {values.caregivers.length > 0 &&
                      values.caregivers.map((caregiver, index) => (
                        <div key={index} className="mb-4">
                          <Field
                            type="text"
                            name={`caregivers.${index}.firstName`}
                            placeholder="First Name"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.firstName`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`caregivers.${index}.lastName`}
                            placeholder="Last Name"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.lastName`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="email"
                            name={`caregivers.${index}.email`}
                            placeholder="Email"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.email`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`caregivers.${index}.gender`}
                            placeholder="Gender"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.gender`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`caregivers.${index}.roleInChurch`}
                            placeholder="Role in Church"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.roleInChurch`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`caregivers.${index}.phoneNumberPrimary`}
                            placeholder="Primary Phone Number"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.phoneNumberPrimary`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`caregivers.${index}.relationshipWithChildType`}
                            placeholder="Relationship with Child Type"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.relationshipWithChildType`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`caregivers.${index}.relationshipWithChild`}
                            placeholder="Relationship with Child"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.relationshipWithChild`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`caregivers.${index}.caregiverRelationshipTypeWithParent`}
                            placeholder="Caregiver Relationship Type with Parent"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.caregiverRelationshipTypeWithParent`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <Field
                            type="text"
                            name={`caregivers.${index}.caregiverRelationshipWithParentData`}
                            placeholder="Caregiver Relationship with Parent Data"
                            className="input"
                          />
                          <ErrorMessage
                            name={`caregivers.${index}.caregiverRelationshipWithParentData`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                          <div className="flex justify-between">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() =>
                        push({
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
                          caregiverRelationshipTypeWithParent: "",
                          caregiverRelationshipWithParentData: "",
                          photograph: null,
                        })
                      }
                    >
                      Add Caregiver
                    </button>
                  </div>
                )}
              </FieldArray>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePreviousStep}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default MultiStepForm;
