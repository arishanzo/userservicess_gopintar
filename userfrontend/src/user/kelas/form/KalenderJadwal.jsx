
import React, { useState, useMemo, useEffect } from "react";

const KalenderJadwal = ( { setFormTglDataBooking, datamentor, formTglDataBooking}) => {
const today = new Date();
const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

const [selectedDates, setSelectedDates] = useState(() => {
  return formTglDataBooking.map((item) => new Date(item.tglbooking));
});

const [selectedSessions, setSelectedSessions] = useState(() => {
  return formTglDataBooking.reduce((acc, item) => {
    acc[item.tglbooking] = item.sesi;
    return acc;
  }, {});
});


const MAX_MEETINGS = 15;

// function formatDate(date) {
//   const d = new Date(date); // pastikan selalu Date object
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }


const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
const addMonths = (date, n) => new Date(date.getFullYear(), date.getMonth() + n, 1);

const monthDays = useMemo(() => {
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const startWeekDay = start.getDay();
  const totalDays = end.getDate();
  const days = [];

  for (let i = 0; i < startWeekDay; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
  }

  return days;
}, [currentMonth]);

function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function getLocalDateKey(date) {
  return date.toLocaleDateString("en-CA"); // format YYYY-MM-DD dalam lokal time
}

function handleSelectDate(date) {
    // setSelectedDates(() => [date]);
    // setSelectedSessions({});

  const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (isPast) return;

  const exists = selectedDates.some((d) => isSameDay(d, date));

  if (exists) {
    setSelectedDates((prev) => prev.filter((d) => !isSameDay(d, date)));
    setSelectedSessions((prev) => {
      const updated = { ...prev };
      const key = getLocalDateKey(date);
      delete updated[key];
       return updated;
    });
       // hapus dari formTglDataBooking
    setFormTglDataBooking((prev) =>
      prev.filter((item) => item.tglbooking !== getLocalDateKey(date))
    );
    
  } else {
    if (selectedDates.length >= MAX_MEETINGS) {
      alert(`Maksimal ${MAX_MEETINGS} hari pertemuan per bulan.`);
      return;
    }
    setSelectedDates((prev) => [...prev, date]);
  }
}

function handleSelectSession(date, session) {
  const key = getLocalDateKey(date);
  setSelectedSessions((prev) => ({ ...prev, [key]: session }));
  
}


    
function monthTitle(date) {
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

const sesiOptions = ["Sesi Pagi", "Sesi Siang", "Sesi Malam"];

useEffect(() => {

    
   
  if (!selectedDates || selectedDates.length === 0) return;

  const newPayload = selectedDates.map((d) => {
    const key = getLocalDateKey(d);
    return {
      idprofilguru: datamentor.idprofilguru,
      tglbooking: key, // simpan sebagai string lokal
      sesi: selectedSessions[key] || "Belum dipilih",
      statusngajar: "Belum Mulai"
    };
  });

  setFormTglDataBooking((prev) => {
    const merged = [...prev];

    newPayload.forEach((item) => {
      const existingIndex = merged.findIndex(
        (p) => p.tglbooking === item.tglbooking
      );

      if (existingIndex !== -1) {
        merged[existingIndex] = item;
      } else {
        merged.push(item);
      }
    });

    return merged;
  });
}, [selectedDates, selectedSessions, setFormTglDataBooking]);

    return (
        <>
          <div className="w-full mx-auto mb-4  ">
      <header className="mb-6">
        <h1 className="text-2xl text-green-800 font-bold">Pilih Jadwal Kelas</h1>
        <p className="text-sm text-gray-600">Pilih maksimal {MAX_MEETINGS} hari pertemuan per bulan.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
     

            <div className="grid grid-cols-1 gap-1">
<div className="w-full bg-green-900 ">
        <div className="flex items-center bg-green-900 text-white justify-between px-4  ">
            <button
                type="button"
                onClick={() => setCurrentMonth((m) => addMonths(m, -1))}
                className="px-2 py-1 rounded "
            >
            ‹
            </button>
            <h2 className="text-lg font-medium text-white">{monthTitle(currentMonth)}</h2>
            <button
                type="button"
                onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                className="px-2 py-1 rounded "
                >
                ›
            </button>
            </div>
            </div>


 <section className="bg-white border rounded-lg p-4 mt-3 shadow shadow-md shadow-green-100">
       
        <div className="grid grid-cols-7 text-xs text-center text-slate-500 mb-2">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
            <div key={d} className="py-1">{d}</div>
            ))}
        </div>


        <div className="grid grid-cols-7 gap-6">

        {monthDays.map((day, idx) => {
            const isDisabled = !day || (day < new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            const isSelected = selectedDates.some((d) => isSameDay(d, day));
            const isTodayFlag = isSameDay(day, today);
            
            
            


        return (
            <button
                key={idx}
                type="button"
                onClick={() => day && handleSelectDate(day)}
                disabled={isDisabled}
                className={`h-12 flex items-center justify-center rounded-md text-sm leading-none
                ${isDisabled ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-green-100 hover:text-green-600'}
                ${isSelected ? 'bg-green-600 text-white' : ''}
                ${isTodayFlag && !isSelected ? 'ring-1 ring-green-200' : ''}`}
                aria-pressed={isSelected}
            >
                    {day ? day.getDate() : ''}
            </button>
          );

        })}
        </div>
    
        </section>

    </div>
            <div className="mb-2">
                

       <div className="w-full h-10 bg-green-900 flex p-4 md:mb-4 items-center justify-between px-4">
        <h1 className="text-md text-white font-bold">Pilih Jam Sesi</h1>
        <p className="text-white text-sm">Max: {selectedDates.length} / {MAX_MEETINGS}</p>
        </div>

        <section className="bg-white border rounded-lg p-4 shadow shadow-md shadow-green-100">
        
                    {selectedDates.length > 0 && (
        <div className="mt-4 space-y-3">
            {selectedDates.map((d, i) => {
                
        
            const key = d.toLocaleDateString("en-CA");

        return (
            <div key={i} className="border rounded p-2">
            <p className="text-sm font-medium">{key}</p>
            <div className="flex gap-2 mt-2">

             {sesiOptions.map((s) => (
                <button
                    key={s}
                    type="button"
                    onClick={() => handleSelectSession(d, s)}
                    className={`px-3 py-1 rounded border text-sm
                    ${formTglDataBooking.sesi === s || selectedSessions[key] === s ? 'bg-green-600 text-white' : 'hover:bg-green-100'}`}
                    >
                {s}
                </button>
          ))}
        </div>

        </div>

        );
        })}

            </div>

        )}
        


          

        </section>
         </div>
</div>
        </div>
          </>
          
          


    )
}

export default KalenderJadwal;