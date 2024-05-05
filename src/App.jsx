import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [joblisting, setJoblisting] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [rolefilters, setRoleFilters] = useState("ios");

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

  return (
    <div className="grid grid-cols-3 cursor-pointer">
      {joblisting
        .filter((item) => {
          if (rolefilters == undefined || item["jobRole"] == rolefilters) {
            return true;
          }
          return false;
        })
        .filter((item) => {
          console.log(experience,item.minExp,item.maxExp,( item["minExp"] >= experience || item["maxExp"]<= experience))
          if (experience == undefined ||( item["minExp"] <= experience && item["maxExp"]>= experience)) {
            return true;
          }
          return false;
        })
        .map((item, index) => (
          <div
            className="border border-2 px-10 py-40  hover:bg-sky-700"
            key={index}
          >
            <div>{item["jdUid"]}</div>
            <div>{item["jobRole"]}</div>
            <div>{item["minExp"]}</div>
            <div>{item["maxExp"]}</div>
            {/* Additional fields to display */}
          </div>
        ))}

      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
