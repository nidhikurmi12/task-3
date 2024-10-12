import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosConnection from "../lib/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [candidate, setCandicate] = useState([]);

  const getCandidate = async () => {
    try {
      const result = await axiosConnection.get("/admin/candidate");
      setCandicate(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandidate();
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data, candidateId) => {
    const interviewData = {
      date: data[`date_${candidateId}`],
      time: data[`time_${candidateId}`], 
    };
 
 
    try {
   const result=   await axiosConnection.post(`/admin/interview/${candidateId}`, interviewData);
      toast(result.data.message)
       console.log(result)
      reset(); 
      getCandidate()
    } catch (error) {
      console.log(error);
    }
  };
console.log("sss")
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Home</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Tasks</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Settings</a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {candidate.length > 0 ? (
            <>
              {candidate.map((ele) => (
                <div key={ele.candidateId._id} className="bg-zinc-700 p-4 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-2">{ele.candidateId.fullname}</h2>
                  <div className="text-white">
                    {ele.IsInterviewShedule ? (
                      <>
                        <p>Interview Date: <strong>{ele.date}</strong></p>
                        <p>Interview Time: <strong>{ele.time}</strong></p>
                      </>
                    ) : (
                      <>
                        {/* Interview Scheduling Form */}
                        <form onSubmit={handleSubmit((data) => onSubmit(data, ele._id))}>
                          <div>
                            <label className="text-sm">Interview Date</label>
                            <input
                              type="date"
                              {...register(`date_${ele._id}`)} // Unique input name per candidate
                              className="text-black p-2"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm">Interview Time</label>
                            <input
                              type="time"
                              {...register(`time_${ele._id}`)} // Unique input name per candidate
                              className="text-black p-2"
                              required
                            />
                          </div>
                          <button type="submit" className="mt-4 bg-blue-600 px-2 py-1 rounded-lg text-white">
                            Schedule Interview
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No candidates available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
