import { useState } from 'react';
import Intro from '../components/Intro';

export default function Home() {
  const [rows, setRows] = useState([]);
  const [output, setOutput] = useState("");

  const addRow = () => {
    setRows([...rows, { name: '', code: '', status: 'في الخدمة', location: 'لا شيء' }]);
  };

  const handleChange = (i, field, value) => {
    const newRows = [...rows];
    newRows[i][field] = value;
    setRows(newRows);
  };

  const generateResult = () => {
    let text = "📌 استلام العمليات 📌\n\n";
    rows.forEach(r => {
      text += `${r.name} ${r.code} (${r.status}) - (${r.location})\n`;
    });
    setOutput(text);
  };

  return (
    <>
      <Intro />
      <main className="p-6">
        <header className="flex items-center gap-3 mb-6">
          <img src="/3.png" alt="شعار الشرطة" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-blue-200">تحديث مركز العمليات للشرطة</h1>
        </header>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <button onClick={addRow} className="bg-purple-600 hover:bg-purple-700 text-white">إضافة سطر جديد</button>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2">الاسم</th>
                <th className="p-2">الكود</th>
                <th className="p-2">الحالة</th>
                <th className="p-2">الموقع</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-600">
                  <td><input className="bg-gray-900 p-1 rounded" value={row.name} onChange={e => handleChange(i, 'name', e.target.value)} /></td>
                  <td><input className="bg-gray-900 p-1 rounded" value={row.code} onChange={e => handleChange(i, 'code', e.target.value)} /></td>
                  <td>
                    <select className="bg-gray-900 p-1 rounded" value={row.status} onChange={e => handleChange(i, 'status', e.target.value)}>
                      <option>في الخدمة</option>
                      <option>مشغول</option>
                      <option>مشغول - تدريب</option>
                      <option>مشغول - اختبار</option>
                      <option>خارج الخدمة</option>
                    </select>
                  </td>
                  <td>
                    <select className="bg-gray-900 p-1 rounded" value={row.location} onChange={e => handleChange(i, 'location', e.target.value)}>
                      <option>لا شيء</option>
                      <option>الشمال</option>
                      <option>الجنوب</option>
                      <option>الشرق</option>
                      <option>الغرب</option>
                      <option>وسط</option>
                      <option>ساندي</option>
                      <option>بوليتو</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={generateResult} className="mt-4 bg-green-600 hover:bg-green-700 text-white">عرض النتيجة</button>

          {output && (
            <div className="mt-4 p-3 bg-gray-900 rounded">
              <pre>{output}</pre>
              <button
                onClick={() => {navigator.clipboard.writeText(output); alert("تم النسخ");}}
                className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
              >
                نسخ النتيجة
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
