import React, { useState } from "react";

const Card = ({ data }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <div className="border border-2 px-5 py-10 m-5 rounded-md">
      <div className="flex">
        <img
          src={data["logoUrl"]}
          alt={data.companyName}
          className="w-15 h-20"
        />
        <div className="flex flex-col pl-5 justify-start items-start ">
          <p className="opacity-90 capitalize ">{data.companyName}</p>
          <p className="text-lg capitalize">{data.jobRole}</p>
          <p className="text-md capitalize">{data.location}</p>
        </div>
      </div>
      <p className="text-start text-lg font-semibold">
        {`Estimated Salary: ₹ ${data.minJdSalary} - ${data.maxJdSalary} LPA `}
      </p>
      <p className="text-lg font-bold text-start">About us</p>
      <p className={showFullContent ? "text-justify font-light" : "line-clamp-[10] text-justify font-light"}>
        {data.jobDetailsFromCompany}
      </p>
      {!showFullContent && (
        <button className="text-indigo-500 mt-2" onClick={() => setShowFullContent(true)}>
          View more
        </button>
      )}

      <p className="text-start font-semibold">
        Minimum Experience <br /> {data.minExp} years
      </p>
      <div className="flex flex-col ">
        <button className="w-full py-4 rounded-lg text-white mt-4 bg-green-500">Easy Apply</button>
        <button className="w-full py-4 mt-4 rounded-lg text-white bg-indigo-700">Unlock Referral Ask</button>
      </div>
    </div>
  );
};

export default Card;
