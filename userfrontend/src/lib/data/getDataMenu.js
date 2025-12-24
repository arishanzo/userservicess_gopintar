
     
 const getDataMenu = () => ([
  { 
    id: 1, 
    judul: 'Profil', 
    link: '/profil',
    icon: '👤',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600'
  },
  { 
    id: 2, 
    judul: 'Guru', 
     link: '/guru',
    icon: '👨‍🏫',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600'
  },
  { 
    id: 3, 
    judul: 'Langganan', 
    link: '/berlangganan',
    icon: '💳',
    color: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600'
  },
  { 
    id: 4, 
    judul: 'Kelas', 
    link: '/kelas',
    icon: '🏫',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600'
  },
  { 
    id: 5, 
    judul: 'Jadwal', 
    link: '/jadwal',
    icon: '📅',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600'
  },

   { 
    id: 6, 
    judul: 'Tugas / Nilai', 
    link: 'kelas',
    icon: '📊',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-600'
  },
  { 
    id: 7, 
    judul: 'Materi', 
    kelas: '/kelas',
    icon: '📚',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600'
  },
  { 
    id: 8, 
    judul: 'Absensi', 
    link: '/kelas',
    icon: '📝',
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600'
  },
 
]);


export { getDataMenu };