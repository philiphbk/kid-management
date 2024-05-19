export interface ParentForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  roleInChurch: string;
  departmentInChurch?: string;
  ministry?: string;
  phoneNumberPrimary: string;
  phoneNumberSecondary?: string;
  idType: string;
  idNumber: string;
  idPhoto: any;
  photograph: any;
  address: string;
}

export interface ChildForm {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: string;
  gender: string;
  dateOfBirth: string;
  photograph: any;
  relationshipWithChildType: string;
  relationshipWithChild: string;
  specialNeeds: string;
  parentId: string;
  caregiverIds: string;
}

export interface CaregiverForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  roleInChurch: string;
  departmentInChurch: string;
  ministry: string;
  phoneNumberPrimary: string;
  phoneNumberSecondary?: string;
  relationshipWithChildType: string;
  relationshipWithChild: string;
  relationshipTypeWithParent: string;
  relationshipWithParent: string;
  photograph?: any;
}

export interface RegistrationForm {
  parent: ParentForm;
  caregiver: CaregiverForm[];
  child: ChildForm[];
}
