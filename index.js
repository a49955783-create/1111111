import { useState } from 'react';
import Intro from '../components/Intro';
import Drawer from '../components/Drawer';

export default function Home() {
  const [rows, setRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [finalText, setFinalText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const addRow = () => {
    setEditingRow({ name: '', code: '', status: 'في الخدمة', location: 'لا شيء' });
    setShowDrawer(true);
  };

  const saveRow = (row) => {
    let newRows = [...rows];
    if (editingRow.index !== undefined) {
      newRows[editingRow.index] = row;
    } else {
      newRows.push(row);
    }
    setRows(newRows);
    setShowDrawer(false);
  };

  const deleteRow = (i) => {
    setRows(rows.filter((_, idx) => idx !== i));
  };

  const generateFinal = () => {
    setLoading(true);
    setProgress(0);
    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setLoading(false);
        let result = '📌 استلام العمليات 📌\n\n';
        rows.forEach(r => {
          let line = `${r.name} ${r.code}`;
          if (r.status !== 'في الخدمة') line += ` (${r.status})`;
          if (r.location !== 'لا شيء') line += ` - (${r.location})`;
          result += line + '\n';
        });
        setFinalText(result);
      }
    }, 100);
  };

  return (
    <div>
      <Intro />
      <header className="header">
        <img src="/3.png" alt="شعار الشرطة" className="logo" />
        <h1>تحديث مركز العمليات للشرطة</h1>
      </header>

      <div className="controls">
        <button onClick={addRow}>➕ إضافة سطر جديد</button>
        <button onClick={generateFinal}>📊 توليد النتيجة</button>
      </div>

      <div className="list">
        {rows.map((r, i) => (
          <div key={i} className="row">
            <span>{r.name}</span>
            <span>{r.code}</span>
            <span>{r.status}</span>
            <span>{r.location}</span>
            <div className="actions">
              <button onClick={() => {setEditingRow({...r, index:i}); setShowDrawer(true);}}>✏️</button>
              <button onClick={() => deleteRow(i)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="overlay">
          <div className="progress-box">
            <p>جارٍ الاستخراج...</p>
            <div className="progress"><div style={{width: progress+'%'}}></div></div>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {finalText && (
        <div className="final">
          <textarea value={finalText} readOnly></textarea>
          <button onClick={() => {navigator.clipboard.writeText(finalText); alert('✅ تم النسخ بنجاح');}}>نسخ</button>
        </div>
      )}

      {showDrawer && (
        <Drawer row={editingRow} onSave={saveRow} onClose={() => setShowDrawer(false)} />
      )}
    </div>
  );
}