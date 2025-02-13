"use client";
import { useState, useEffect } from "react";
import Dialog from "../Dialog/Dialog";
import Table from "../Table/Table";
import "./Container.css";

const Container = () => {
  const [show, setShow] = useState(false);
  const [employs, setEmploys] = useState([]);
  const [totalAdvance, setTotalAdvance] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  // ✅ تحميل البيانات من localStorage عند التشغيل
  useEffect(() => {
    const storedEmploys = JSON.parse(localStorage.getItem("employ")) || [];
    const storedTotalAdvance = JSON.parse(localStorage.getItem("totalAdvance")) || 0;

    setEmploys(storedEmploys);
    setTotalAdvance(storedTotalAdvance);
  }, []);

  // ✅ تحديث المبلغ المتبقي عند تغيير الموظفين أو السلف
  useEffect(() => {
    calculateRemainingAmount();
  }, [employs, totalAdvance]);

  const handleEmployAdded = () => {
    const updatedEmploys = JSON.parse(localStorage.getItem("employ")) || [];
    setEmploys(updatedEmploys);
  };

  // ✅ تحديث قيمة السلف وحفظها في localStorage
  const handleTotalAdvanceChange = (e) => {
    const newAdvance = Number(e.target.value);
    setTotalAdvance(newAdvance);
    localStorage.setItem("totalAdvance", JSON.stringify(newAdvance));
  };

  const calculateRemainingAmount = () => {
    let deductedAmount = employs.reduce((total, emp) => total + (emp.salary * emp.day), 0);
    setRemainingAmount(totalAdvance - deductedAmount);
  };

  // ✅ دالة لحذف جميع البيانات
  const handleResetData = () => {
    if (window.confirm("هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.")) {
      localStorage.removeItem("employ");
      localStorage.removeItem("totalAdvance");
      setEmploys([]);
      setTotalAdvance(0);
      setRemainingAmount(0);
    }
  };

  return (
    <div className="container">
      <input
        className="input-total"
        type="number"
        placeholder="أضف مجموع السلف"
        value={totalAdvance}
        onChange={handleTotalAdvanceChange}
      />
      <button onClick={() => setShow(!show)} className="add-employ">إضافة موظف</button>

      {/* ✅ تمرير setEmploys إلى Table */}
      <Table employ={employs} setEmploys={setEmploys} />
      <Dialog show={show} setShow={setShow} onEmployAdded={handleEmployAdded} />
      <p className="remaining-amount">المبلغ المتبقي: {remainingAmount}</p>
      <button onClick={handleResetData} className="reset-btn">🗑️ حذف جميع البيانات</button>
    </div>
  );
};

export default Container;
