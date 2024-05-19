import pool from "@/lib/db";
import { ChildForm } from "@/lib/interfaces";
import { ResultSetHeader } from "mysql2";

export const createChild = async (child: ChildForm) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO children 
      (parent_id, firstName, lastName, ageGroup, gender, dateOfBirth, photograph, 
      relationshipWithChildType, relationshipWithChild, specialNeeds) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        child.parentId,
        child.firstName,
        child.lastName,
        child.ageGroup,
        child.gender,
        child.dateOfBirth,
        child.photograph,
        child.relationshipWithChildType,
        child.relationshipWithChild,
        child.specialNeeds,
      ]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
};
