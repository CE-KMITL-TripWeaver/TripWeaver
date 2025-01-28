import axios from "axios";

export const fetchPlanData = async (planID: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/plantrip/getPlan/${planID}`
  );
  return data;
};

export const fetchUserPlans = async (userID: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/getUser/${userID}`
  );
  return data.planList;
};

export const fetchAllData = async () => {
  const [attractions, restaurants, accommodations] = await Promise.all([
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attraction/getAllData`),
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/getAllData`),
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accommodation/getAllData`),
  ]);
  return {
    attractions: attractions.data.attractions || [],
    restaurants: restaurants.data.restaurants || [],
    accommodations: accommodations.data.accommodations || [],
  };
};
