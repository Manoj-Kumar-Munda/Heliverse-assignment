import axios from "axios";

export const fetchUsers = async (userType) => {
 
    const res = await axios.get(`/api/v1/user/${userType}`);
    console.log(res?.data);
    if (!res?.data?.success) {
      throw new Error(res?.data?.message);
    }
    return res?.data;
};
