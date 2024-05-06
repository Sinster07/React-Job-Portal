import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [joblisting, setJoblisting] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [rolefilters, setRoleFilters] = useState(undefined);

  const [experience, setExperience] = useState(8);
  const [remote, setRemote] = useState(undefined);
  const [teckstack, setTeckstack] = useState(undefined);
  const [minisalary, setMinisalary] = useState(undefined);
  const [companyname, setCompanyname] = useState(undefined);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchJobs = () => {
    setLoading(true);
    const body = JSON.stringify({
      limit: 10,
      offset: page,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setJoblisting((prevJoblisting) => [
          ...prevJoblisting,
          ...result["jdList"],
        ]);
        setCount(result["totalCount"]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 10); // Increase page number to fetch next set of data
    }
  };

  const handleRoleChange = (e) => {
    setRoleFilters(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setExperience(parseInt(e.target.value));
  };

  const handleRemoteChange = (e) => {
    setRemote(e.target.value);
  };

  const handleTechStackChange = (e) => {
    setTeckstack(e.target.value);
  };
  const handleMiniSalaryChange = (e) => {
    setMinisalary(e.target.value);
  };
  const handleCompanyName = (e) => {
    setCompanyname(e.target.value);
  };
  return (
    <>
      <div className="flex space-x-4">
        <select 
          
          value={rolefilters}
          onChange={handleRoleChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value=""> Roles </option>
          <option value="frontend">Frontend</option>
          <option value="backened">Backend</option>
          <option value="fullstack">FullStack</option>
          <option value="ios">IOS</option>
          <option value="flutter">Flutter</option>
          <option value="reactnative">React Native</option>
          <option value="android">Andriod</option>
          <option value="techlead">TechLead</option>
          <option value="devops">Dev-ops</option>
        </select>
        <select
          value={experience}
          onChange={handleExperienceChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Experience</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          {/* Add more options as needed */}
        </select>
        <select
          value={remote}
          onChange={handleRemoteChange}
          className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Remote</option>
          <option value="yes">Hybrid</option>
          <option value="no">InOffice</option>
        </select>

        <select
          value={minisalary}
          onChange={handleMiniSalaryChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Minimum Base Pay Salary</option>
          <option value="stack1">0L</option>
          <option value="stack2">10L</option>
          <option value="stack3">20L</option>
          <option value="stack3">30L</option>
          <option value="stack3">40L</option>
          <option value="stack3">50L</option>
          <option value="stack3">60L</option>
          <option value="stack3">70L</option>
        </select>
        <input
          type="text"
          value={companyname}
          onChange={handleCompanyName}
          placeholder="Enter the name of the Company"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-3  mt-20 ">
        {joblisting
          .filter((item) => {
            if (rolefilters == undefined || item["jobRole"] == rolefilters) {
              return true;
            }
            return false;
          })
          .filter((item) => {
            console.log(
              experience,
              item.minExp,
              item.maxExp,
              item["minExp"] >= experience || item["maxExp"] <= experience
            );
            if (
              experience == undefined ||
              (item["minExp"] <= experience && item["maxExp"] >= experience)
            ) {
              return true;
            }
            return false;
          })
          .map((item, index) => (
            <Card key={index + 1} data={item} 
            />
          ))}

        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}

export default App;
