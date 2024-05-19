import pool from "@/lib/db";
import { ParentForm } from "@/lib/interfaces";
import { ResultSetHeader } from "mysql2";

export const createParent = async (parent: ParentForm) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO parents 
      (firstName, lastName, email, gender, roleInChurch, departmentInChurch, ministry, 
      phoneNumberPrimary, phoneNumberSecondary, idType, idNumber, idPhoto, photograph, address) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        parent.firstName,
        parent.lastName,
        parent.email,
        parent.gender,
        parent.roleInChurch,
        parent.departmentInChurch,
        parent.ministry,
        parent.phoneNumberPrimary,
        parent.phoneNumberSecondary,
        parent.idType,
        parent.idNumber,
        parent.idPhoto,
        parent.photograph,
        parent.address,
      ]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
};
