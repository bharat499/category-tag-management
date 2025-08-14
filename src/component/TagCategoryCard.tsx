import React,{memo} from "react";
import styles from "./TagCategoryCard.module.scss";

interface ViewListProps {
  data: Record<string, any>[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const TagCategoryCard = (props:ViewListProps) => {
  const { data,onEdit, onDelete}=props
  if (!data.length) return <h2 className="text-center">No records found.</h2>;

  const headers = Object.keys(data[0]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Tag Categories</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((head) => (
                <th key={head}>{head}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {headers.map((head) => (
                  <td key={head}>{String(row[head])}</td>
                ))}
                <td className={styles.actions}>
                  <button
                    onClick={() => onEdit(idx)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(idx)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(TagCategoryCard);



