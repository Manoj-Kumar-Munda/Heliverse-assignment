import React from "react";

const StudentsTable = ({ data }) => {


  return (
    <table className="min-w-full overflow-x-auto w-full ">
      <thead className="">
        <tr>
          <th scope="col" className="text-start pr-3 py-2">
            <span>ID</span>
          </th>
          <th scope="col" className="text-start pr-3 py-2 ">
            <span>Name</span>
          </th>
          <th scope="col" className="text-start pr-3 py-2">
            <span>Email</span>
          </th>
          <th scope="col" className="text-start pr-3 py-2">
            <span>Role</span>
          </th>
          <th scope="col" className="text-start pr-3 py-2">
            <span>Teacher</span>
          </th>
          <th scope="col" className="text-start pr-3 py-2">
            <span>Class</span>
          </th>
          <th scope="col" className="text-start pr-3 py-2">
            <span>Action</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {data?.length > 0 &&
          data?.map((student) => (
            <tr key={student?._id}>
              <td className="whitespace-nowrap pr-3 py-2 ">{student?._id}</td>
              <td className="whitespace-nowrap pr-3 py-2">{student?.name}</td>
              <td className="whitespace-nowrap pr-3 py-2">{student?.email}</td>
              <td className="whitespace-nowrap pr-3 py-2">{student?.role}</td>
              <td className="whitespace-nowrap pr-3 py-2">
                {student?.teacher?.name || student?.teacher?._id}
              </td>
              <td className="whitespace-nowrap pr-3 py-2">
                {student?.classroom?.name}
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default StudentsTable;
