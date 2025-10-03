import { useEffect, useState } from 'react';

export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-policeGray z-50">
      <img src="/3.png" alt="شعار الشرطة" className="w-32 h-32 mb-4 animate-pulse" />
      <h1 className="text-3xl font-bold text-blue-300 animate-fadeIn">تحديث مركز العمليات للشرطة</h1>
    </div>
  );
}
