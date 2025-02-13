import { useState } from "react";
import Counter from "../Counter/Counter";
import "./Table.css";

const Table = ({ employ = [], setEmploys }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSalary, setEditSalary] = useState(0);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // ✅ حذف موظف
  const handleDelete = (index) => {
    const updatedEmploys = employ.filter((_, i) => i !== index);
    localStorage.setItem("employ", JSON.stringify(updatedEmploys));
    setEmploys(updatedEmploys);
  };

  // ✅ تحديث حالة الموظف
  const updateStatus = (index, status) => {
    const updatedEmploys = [...employ];
    updatedEmploys[index] = { ...updatedEmploys[index], status };
    localStorage.setItem("employ", JSON.stringify(updatedEmploys));
    setEmploys(updatedEmploys);
  };

  // ✅ فتح نافذة التعديل
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditName(employ[index].name);
    setEditSalary(employ[index].salary);
    setShowEditDialog(true);
  };

  // ✅ حفظ التعديلات
  const handleSaveEdit = () => {
    const updatedEmploys = [...employ];
    updatedEmploys[editIndex] = {
      ...updatedEmploys[editIndex],
      name: editName,
      salary: editSalary,
    };
    localStorage.setItem("employ", JSON.stringify(updatedEmploys));
    setEmploys(updatedEmploys);
    setShowEditDialog(false);
  };

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>الأسم</th>
            <th>اليومية</th>
            <th>ايام السلف</th>
            <th>الحالة</th>
            <th>الأجرأت</th>
          </tr>
        </thead>
        <tbody>
          {employ.length > 0 ? (
            employ.map((element, index) => (
              <tr key={index}>
                <td>{element.name}</td>
                <td>{element.salary}</td>
                <td>
                  <Counter
                    numDay={element.day}
                    iD={index}
                    setEmploys={setEmploys}
                  />
                </td>
                <td
                  
                >
                <p className={
                    element.status === "تم التسليم"
                      ? "status-delivered"
                      : element.status === "مؤجل"
                      ? "status-pending"
                      : ""
                  }> {element.status || "غير محدد"}</p>
                 
                </td>

                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(index)}
                  >
                    تعديل
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    حذف
                  </button>
                  <button
                    className="delivered-btn"
                    onClick={() => updateStatus(index, "تم التسليم")}
                  >
                    تم التسليم
                  </button>
                  <button
                    className="pending-btn"
                    onClick={() => updateStatus(index, "مؤجل")}
                  >
                    مؤجل
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">لا يوجد موظفين مضافين بعد.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ نافذة تعديل الموظف */}
      {showEditDialog && (
        <div className="edit-dialog">
          <h2 className="edit-title">تعديل الموظف</h2>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="اسم الموظف"
          />
          <input
            type="number"
            value={editSalary}
            onChange={(e) => setEditSalary(Number(e.target.value))}
            placeholder="يومية الموظف"
          />
          <div className="actions">
            <button onClick={handleSaveEdit}>حفظ</button>
            <button onClick={() => setShowEditDialog(false)}>إلغاء</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
