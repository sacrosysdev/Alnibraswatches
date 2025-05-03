import React from 'react';
import { SIDELINKS_DATA } from '../../../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../../../api/user/hooks';

const SidebarLinks = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = async() => {
    try {
      await logoutMutation.mutateAsync(); 

      // Clear client-side storage
      localStorage.removeItem("alNibrazUserId");
      localStorage.removeItem("redirectAfterLogin");
      localStorage.removeItem("alNibrazuserDet");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className='pt-5'>
      <ul className='flex flex-col gap-3'>
        {SIDELINKS_DATA.map((item, index) => (
          item.name === "Logout" ? (
            <li
              key={index}
              onClick={handleLogout}
              className={`p-4 cursor-pointer bg-white text-[#003F38] hover:bg-[#003F38] hover:text-white transition`}
            >
              <h1 className='text-base font-normal'>{item.name}</h1>
            </li>
          ) : (
            <Link to={item.path} key={index}>
              <li
                className={`p-4 ${item.path === path
                  ? 'bg-[#003F38] text-white'
                  : 'bg-white text-[#003F38]'
                  }`}
              >
                <h1 className='text-base font-normal'>{item.name}</h1>
              </li>
            </Link>
          )
        ))}
      </ul>
    </div>
  );
};

export default SidebarLinks;
