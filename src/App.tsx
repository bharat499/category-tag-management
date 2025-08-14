import React, { useState } from "react";
import sampleTagCategory from "./data/mockData";
import  DynamicForm  from "./component/DynamicForm";
import  TagCategoryCard  from "./component/TagCategoryCard";
import styles from "./App.module.scss";

 const App=() =>{
  const [records, setRecords] = useState<Record<string, any>[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showConfirm,setShowConfirm]=useState(false);
  const [deleteIndex,setDeleteIndex]=useState<any>(null)

  const handleSubmit = (data: Record<string, any>) => {
    if (editIndex !== null) {
      const updated = [...records];
      updated[editIndex] = data;
      setRecords(updated);
      setEditIndex(null);
    } else {
      setRecords([...records, data]);
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
  };
;

  const confirmDelete = () => {
     setRecords(records.filter((_, i) => i !== deleteIndex));
    setShowConfirm(false);
    
  };
  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setShowConfirm(true);
   
  };

  return (
    <div  className={styles.container}>
      <h1>
        Dynamic Tag Category Form
      </h1>
      <DynamicForm
        category={sampleTagCategory}
        mode={editIndex !== null ? "edit" : "create"}
        initialData={editIndex !== null ? records[editIndex] : {}}
        onSubmit={handleSubmit}
        editIndex={editIndex}
      />
      <TagCategoryCard
        data={records}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
       {showConfirm && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <p>Are you sure you want to delete this item?</p>
            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button className={styles.confirmBtn} onClick={confirmDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App