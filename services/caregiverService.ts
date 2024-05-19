import pool from "@/lib/db";
import { CaregiverForm } from "@/lib/interfaces";
import { ResultSetHeader } from "mysql2";

export const createCaregiver = async (caregiver: CaregiverForm) => {
  const connection = await pool.getConnection();
  try {
    const [caregiverResult] = await connection.query<ResultSetHeader>(
      `INSERT INTO caregivers 
      (firstName, lastName, email, gender, roleInChurch, departmentInChurch, ministry, 
      phoneNumberPrimary, phoneNumberSecondary, relationshipWithChildType, relationshipWithChild, 
      caregiverRelationshipTypeWithParent, caregiverRelationshipWithParentData, photograph) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        caregiver.firstName,
        caregiver.lastName,
        caregiver.email,
        caregiver.gender,
        caregiver.roleInChurch,
        caregiver.departmentInChurch,
        caregiver.ministry,
        caregiver.phoneNumberPrimary,
        caregiver.phoneNumberSecondary,
        caregiver.relationshipWithChildType,
        caregiver.relationshipWithChild,
        caregiver.relationshipTypeWithParent,
        caregiver.relationshipWithParent,
        caregiver.photograph,
      ]
    );
    const caregiverId = caregiverResult.insertId;
    // await connection.query(
    //   `INSERT INTO caregiver_assignments (parent_id, child_id, caregiver_id) VALUES (?, ?, ?)`,
    //   [caregiver.parentId, caregiver.childId, caregiverId]
    // );
    return caregiverId;
  } finally {
    connection.release();
  }
};
