import { useEffect, useState } from 'react';

export default function Intro() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => setVisible(false), 3000);
  }, []);
  if (!visible) return null;
  return (
    <div className="intro">
      <img src="/3.png" alt="شعار الشرطة" className="intro-logo" />
      <h1>تحديث مركز العمليات للشرطة</h1>
    </div>
  );
}