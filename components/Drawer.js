import { useState } from 'react';

export default function Drawer({ row, onSave, onClose }) {
  const [name, setName] = useState(row?.name || '');
  const [code, setCode] = useState(row?.code || '');
  const [status, setStatus] = useState(row?.status || 'في الخدمة');
  const [location, setLocation] = useState(row?.location || 'لا شيء');

  return (
    <div className="drawer">
      <div className="drawer-content">
        <h3>تعديل/إضافة</h3>
        <input placeholder="الاسم" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="الكود" value={code} onChange={e=>setCode(e.target.value)} />
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option>في الخدمة</option>
          <option>مشغول</option>
          <option>مشغول - تدريب</option>
          <option>مشغول - اختبار</option>
          <option>خارج الخدمة</option>
        </select>
        <select value={location} onChange={e=>setLocation(e.target.value)}>
          <option>لا شيء</option>
          <option>الشمال</option>
          <option>الجنوب</option>
          <option>الشرق</option>
          <option>الغرب</option>
          <option>الوسط</option>
          <option>ساندي</option>
          <option>بوليتو</option>
        </select>
        <div className="drawer-actions">
          <button onClick={()=>onSave({name,code,status,location})}>حفظ</button>
          <button onClick={onClose}>إلغاء</button>
        </div>
      </div>
    </div>
  );
}