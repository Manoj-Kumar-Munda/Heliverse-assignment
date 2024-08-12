export const getCurrentUser = async () => {
  try {
    const res = await fetch("/api/v1/user/current-user");
    const data = await res.json();
    return data?.data;
  } catch (error) {
    return null;
  }
};
