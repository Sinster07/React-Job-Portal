import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [joblisting, setJoblisting] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [rolefilters, setRoleFilters] = useState("ios");
  const [numberofemp,setNumberofemp] = useState(null);
  const [experience, setExperience] = useState(null);
  const [remote, setRemote] = useState(null);
  const [teckstack, setTeckstack] = useState(null);
  const [minisalary, setMinisalary] = useState(null);
  const [companyname, setCompanyname] = useState(null);
  

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

  return ( 
    
    <div className="grid grid-cols-3 cursor-pointer">
   {joblisting.filter((item) => {
  if (
    (rolefilters === null || item.jobRole === rolefilters) ||
    (numberofemp === null || item.numberOfEmployees === numberofemp) ||
    (experience === null || item.experience === experience) ||
    (remote === null || item.isRemote === remote) ||
    (teckstack === null || item.technologyStack === teckstack) ||
    (minisalary === null || item.minSalary >= minisalary) ||
    (companyname === null || item.companyName === companyname)
  ) {
    return true; // Return true if any filter matches
  }
  return false;
}).map((item, index) => (
  <div className="border border-2 px-10 py-40  hover:bg-sky-700" key={index}>
    <div>{item["jdUid"]}</div>
    <div>{item["jobRole"]}</div>
    {/* Additional fields to display */}
  </div>
))}

      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
