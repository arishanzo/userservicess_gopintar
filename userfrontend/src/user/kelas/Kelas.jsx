
import SideNav from '../components/SideNav';
import { UseGetBooking } from '../../hook/kelas/useGetBooking';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageNonKelas from './page/PageNonKelas';
import PageKelas from './page/PageKelas';

const Kelas = () => {
   
   
    const Navigate = useNavigate();
     const { user } = useAuth();
   
     const handleRedirectToGuru = () => {
        Navigate('/guru');
    };


    const {booking, loading} = UseGetBooking(user?.iduser);
   
  
    return (
        <>
        
 <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
   
    <div className="flex-1  py-24 top-0 min-h-screen w-[80%]">
            {loading ? (
                 <div className="p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/6"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="mt-8 h-10 bg-gray-200 rounded"></div>
          </div>
            ) : (
                     
                
                    <section className=" px-2 md:px-6 w-full bg-gray-50">

                   {booking ? (
                <PageKelas booking={booking}/>
                  ) : (
                    <PageNonKelas handleRedirectToGuru={handleRedirectToGuru} />
                  )}

                        </section>

        
            )}

            </div>
            </div>
        </>
    )
}

export default Kelas;