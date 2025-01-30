import axios from "axios";

interface PlanUpdateInterface {
  accommodations: {
    accommodationID: string;
  }[];
  plans: {
    planName: string;
    places: {
      placeID: string;
      type: string;
      duration: number;
    }[];
  }[];
}

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

export const updateUserPlans = async (planID: string,planData: PlanUpdateInterface) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/plantrip/update/${planID}`,
    planData
  );
  return data;
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

export const fetchAttractionRating = async (provinceName: string,districtList: string[]) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attraction/rating`, {
    provinceName: provinceName,
    districtList: districtList
  });
  return data;

}

export const fetchAttractionTags = async () => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attraction/tags`);
  return data;

}


export const fetchAttractionKeyList = async (provinceName: string,districtList: string[]) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attraction/getAttraction`, {
    provinceName: provinceName,
    districtList: districtList
  });
  return data;

}

export const fetchDistrict = async (provinceName: string) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/province/listDistrict`, {
    provinceName: provinceName
  });
  return data;

}

export const fetchProvince = async () => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/province/listProvince`);

  return data;

}

export const fetchAttraction = async (provinceName: string, districtList: string[],
  tagLists: string[], rating: number[], page: number,
  radius?: number, centerLatitude?: number, centerLongitude?: number
) => {



  const requestBody: Record<string, any> = {
    provinceName,
    districtList,
    tagLists,
    rating: rating.length > 0 ? rating : [1, 2, 3, 4, 5],
    page,
    ...(radius !== null && radius !== undefined && { radius }),
    ...(centerLatitude !== null && centerLatitude !== undefined && { centerLatitude }),
    ...(centerLongitude !== null && centerLongitude !== undefined && { centerLongitude }),
  };

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attraction/getDataWithCondition`
    , requestBody
  );

  return data;

}