"use client"
import "./dialog.css";
import { useState, useRef } from "react";

const Dialog = ({ show, setShow, onEmployAdded }) => {
  const notfy = useRef();
  const nameInp = useRef();
  const salaryInp = useRef();
  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const [day, setDay] = useState(0);

  const notfyTime = () => {
    if (!notfy.current) return; // ✅ تجنب الخطأ إذا لم يتم تعيين `ref`
    
    setTimeout(() => {
      if (notfy.current) notfy.current.style.visibility = "hidden";
    }, 3000);
  
    notfy.current.style.visibility = "visible";
  };
  

  const addEmploy = () => {
    if (!name || !salary) {
      if (notfy.current) {
        notfy.current.innerText = "يجب ملئ جميع الحقول";
        notfy.current.style.background = "#c53434";
        notfyTime();
      }
      return;
    }
  
    if (notfy.current) {
      notfy.current.innerText = "تم اضافة الموظف بنجاح";
      notfy.current.style.background = "#42c534";
      notfyTime();
    }
  
    const employ = JSON.parse(localStorage.getItem("employ")) || [];
    employ.push({ name, salary, day });
    localStorage.setItem("employ", JSON.stringify(employ));
  
    onEmployAdded();
  
    // ✅ إعادة تعيين المدخلات
    setName("");
    setSalary(0);
    if (nameInp.current) nameInp.current.value = "";
    if (salaryInp.current) salaryInp.current.value = "";
  };
  

  if (!show) return null;

  return (
    <div className="dialog">
      <button className="close" onClick={() => setShow(false)}></button>
      <h1 className="title">إضافة الموظفين</h1>
      <input ref={nameInp} onChange={(e) => setName(e.target.value)} className="inp" type="text" placeholder="اسم الموظف" />
      <input ref={salaryInp} onChange={(e) => setSalary(Number(e.target.value))} className="inp" type="number" placeholder="يومية الموظف" />
      <button id="employ" onClick={addEmploy}>اضف الموظف</button>
      <span id="ddd" className="notfy" ref={notfy}>تم اضافة الموظف بنجاح</span>
    </div>
  );
};

export default Dialog;
