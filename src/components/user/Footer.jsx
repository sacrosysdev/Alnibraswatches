import React from 'react'
import Logo from '../../assets/images/navbar/alnibraslogo.png'
import { footerData } from '../../constants'
import { useCategoryList } from "../../api/user/hooks";
import { useNavigate } from 'react-router-dom'
const Footer = () => {
  const { data: categories, isLoading: loadingCategories } = useCategoryList()
  const navigate = useNavigate()
  const goCategoryHandler = (categoryId) =>{
      navigate(`/trending?category=${categoryId}`);
  }
  const navigationHandler = (link) =>{
     window.open(link, '_blank');
  }
  return (
    <div className="bg-[#A3C4C1]">
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 p-5 xl:p-20">
      <div className="text-[#003F38]">
        <img src={Logo} alt="logo" className="object-contain" />
      </div>
  
      <div className="text-[#003F38]">
        <h1 className="font-medium text-xl">Categories</h1>
        <ul className="pt-5 flex flex-col gap-4 text-base">
          {!loadingCategories && categories?.length > 0 && categories.map((el, index) => (
            <li key={index} className="cursor-pointer" onClick={() => goCategoryHandler(el.Id)}>
              {el.Name}
            </li>
          ))}
        </ul>
      </div>
  
      {footerData.map((item, index) => (
        <div key={index} className="text-[#003F38]">
          <h1 className="font-medium text-xl">{item.title}</h1>
          <ul className="pt-5 flex flex-col gap-4 text-base">
            {item.subtitles.map((el, subIndex) => (
              <li key={subIndex} className="flex gap-1 items-center cursor-pointer" onClick={()=>navigationHandler(el.link)}>
                {el.icon && <img src={el.icon} alt="icon" />}
                <span>{el.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
  
      <div className="text-[#003F38]">
        <h1 className="font-medium text-lg text-start xl:text-end">Questions? Comments? Concerns?</h1>
        <div className="pt-5 flex xl:justify-end">
          <button className="bg-[#003F38] rounded-lg px-5 py-2 text-white">Help</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Footer