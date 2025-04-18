import React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import SalesAndCostChart from "../../components/admin/SalesAndCostChart";
import VisitsChart from "../../components/admin/VisitsChart";
import TotalOrderChart from "../../components/admin/TotalOrderChart";
import TotalProfitChart from "../../components/admin/TotalProfitChart";
import DiscountChart from "../../components/admin/DiscountChart";
import ReportsGraph from "../../components/admin/ReportsGraph";

function DashboardHome() {
  return (
    <div
      className={` h-full p-5 pt-2 transition-all duration-300 flex flex-col md:gap-y-6 gap-y-4 w-full  overflow-y-scroll mx-auto`}
    >
      {/* Graph section */}
      <section className="w-full h-fit flex flex-col gap-y-6">
        <div className="w-full lg:h-[200px] h-fit flex flex-col lg:flex-row  justify-between gap-6 items-center">
          <div className="lg:w-7/12 w-full  h-fit rounded-2xl shadow-md ">
            <SalesAndCostChart />
          </div>
          <div className="lg:w-5/12 w-full  h-fit rounded-2xl shadow-md  ">
            <VisitsChart />
          </div>
        </div>
        <div className="w-full h-fit lg:h-[200px] flex flex-col lg:flex-row gap-6 ">
          <div className="lg:w-4/12 h-[200px] lg:h-full  rounded-2xl ">
            <TotalOrderChart />
          </div>
          <div className="lg:w-4/12 h-[200px] lg:h-full rounded-2xl ">
            <TotalProfitChart />
          </div>
          <div className="lg:w-4/12 h-[200px] lg:h-full rounded-2xl ">
            <DiscountChart />
          </div>
        </div>
        <div className="w-full h-[480px] flex flex-col lg:flex-row  justify-between gap-x-6 items-center">
          <div className="lg:w-7/12 w-full bg-white h-full rounded-2xl shadow-md flex flex-col p-3 ">
            <div className="w-full h-fit flex flex-col">
              <div className="w-full h-fit flex flex-row justify-between items-start p-3 ">
                <div className="w-fit h-fit flex flex-col">
                  <h5 className="text-[#23272E] text-lg font-public capitalize font-semibold  ">
                    reports
                  </h5>
                  <span className="text-[#8B909A] text-sm capitalize font-medium font-public ">
                    Last 7 Days
                  </span>
                </div>
                <button className="flex items-center justify-center px-1 py-0.5 text-[#4B465C]">
                  <SlOptionsVertical />
                </button>
              </div>
              <div className="w-full h-full">
                <ReportsGraph />
              </div>
            </div>
          </div>

          <div className="lg:w-5/12 w-full bg-amber-100  h-full rounded-2xl shadow-md "></div>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
