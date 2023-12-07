import axios from "axios";
import { useState } from "react";
import React from "react";

const GetUsers = () => {
  const [users, setUsers] = useState([]);

  const callUsers = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUsers(res.data);
    
  };
  callUsers();


  return (
    <>
      <div className="border-t-2 mt-3 border-slate-700">
        <h1 className=" ps-1 px-3 py-1 bg-slate-500 mt-2 w-fit rounded-sm">
          The list of users taken from Jasonplaceholder:
        </h1>
        <div className="mt-4 ">
          <div className="relative overflow-x-auto border-2 border-slate-500 w-fit">
            <table className="w-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.length > 0 
                  ? users.map((user) => {
                      return (
                        <tr className="bg-white dark:bg-gray-800">
                          <td className="px-6 py-4">{user}</td>
                        </tr>
                      );
                    })
                  : " user is not exist"}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default GetUsers
