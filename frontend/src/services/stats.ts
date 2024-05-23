const fetchUserStats = async (
  start_date: string,
  end_date: string,
  query_param: string,
  token: string
): Promise<{ data: AllDayStat[] }> => {
  const query = new URLSearchParams({
    start_date: start_date,
    end_date: end_date,
    query_param: query_param,
  }).toString();

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_HOST + `/api/user_stats/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token === undefined ? {} : { Authorization: "Bearer " + token }),
      },
    }
  );

  const data = await response.json();
  console.log("🚀 ~ data:", data);

  if (response.ok && data) {
    return data;
  }

  throw Error(data.detail);
};

export default fetchUserStats;
