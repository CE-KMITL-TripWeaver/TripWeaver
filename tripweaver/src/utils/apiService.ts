import axios from "axios";
import { PlanUpdateInterface } from "@/app/[locale]/interface/plantripObject";

interface planBodyInterface {
  planList: string[];
}

export const fetchPlanData = async (planID: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/plantrip/getPlan/${planID}`
  );

  return data;
};

export const addLocationToTrip = async (planID: string,locationID: string, indexDate: number, locationType: string) => {
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/plantrip/addLocation/${planID}`,
    {
      locationID: locationID,
      indexDate: indexDate,
      locationType: locationType
    }
  );
  return data;
};

export const fetchPlanAllData = async (planBody: planBodyInterface) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/plantrip/getPlan`,
    planBody
  );
  return data;
};

export const updatePlanLike = async (planID: string,userID: string,statusType: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/plantrip/addLike`,
    {
      planID: planID,
      statusType: statusType,
      userID: userID
    }
  );
  return data;
};

export const updateBlogLike = async (blogID: string,userID: string,statusType: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/addLike`,
    {
      blogID: blogID,
      statusType: statusType,
      userID: userID
    }
  );
  return data;
}

export const fetchUserPlans = async (userID: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/getUser/${userID}`
  );
  return data.planList;
};

export const fetchBlogData = async (blogID : string) => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/getBlog/${blogID}`
    );
    return data.blog;
};

export const fetchUserData = async (userID: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/user/getUser/${userID}`
  );
  return data;
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

export const fetchAttractionTags = async () => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attraction/tags`);
  return data;

}

export const fetchRestaurantType = async () => {

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/type`);
  return data;

}

export const fetchRestaurantFacility = async () => {

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/facility`);
  return data;

}

export const fetchAccommodationFacility = async () => {

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/accommodation/facility`);
  return data;

}

export const fetchAccommodationType = async () => {

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/accommodation/type`);
  return data;

}

export const fetchAccommodationTag = async () => {

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/accommodation/tag`);
  return data;

}

export const uploadImg = async (formData: FormData) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/plantrip/uploadImg`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;

}

export const uploadBlogImg = async (formData: FormData) => {
  
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blog/uploadImg`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export const fetchAttractionData = async (locationID: string) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attraction/getAttraction/${locationID}`);
  return data;

}

export const fetchRestaurantData = async (locationID: string) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/getRestaurant/${locationID}`);
  return data;

}

export const fetchAccommodationData = async (locationID: string) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accommodation/getAccommodation/${locationID}`);
  return data;

}

export const fetchAttractionKeyList = async (provinceName: string,districtList: string[]) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attraction/getAttraction`, {
    provinceName: provinceName,
    districtList: districtList
  });
  return data;

}

export const fetchRestaurantKeyList = async (provinceName: string,districtList: string[]) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/getRestaurant`, {
    provinceName: provinceName,
    districtList: districtList
  });
  return data;

}

export const fetchAccommodationKeyList = async (provinceName: string,districtList: string[]) => {

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accommodation/getAccommodation`, {
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

export const fetchBlog = async (provinceName: string,
  tagLists: string[],page: number,
) => {
  const requestBody: Record<string, any> = {
    provinceName,
    tagLists,
    page,
  };
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blog/getBlog`
    , requestBody
  );
  return data;

}

export const fetchRestaurant = async (provinceName: string, districtList: string[],
  typeLists: string[],facilityList: string[], rating: number[], page: number,
  radius?: number, centerLatitude?: number, centerLongitude?: number
) => {

  const requestBody: Record<string, any> = {
    provinceName,
    districtList,
    typeLists,
    facilityList,
    rating: rating.length > 0 ? rating : [1, 2, 3, 4, 5],
    page,
    ...(radius !== null && radius !== undefined && { radius }),
    ...(centerLatitude !== null && centerLatitude !== undefined && { centerLatitude }),
    ...(centerLongitude !== null && centerLongitude !== undefined && { centerLongitude }),
  };

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/restaurant/getDataWithCondition`
    , requestBody
  );

  return data;

}

export const fetchAccommodation = async (provinceName: string, districtList: string[],
  typeLists: string[],facilityList: string[],tagList: string[], rating: number[], page: number,
  radius?: number, centerLatitude?: number, centerLongitude?: number
) => {

  const requestBody: Record<string, any> = {
    provinceName,
    districtList,
    typeLists,
    facilityList,
    tagList,
    rating: rating && rating.length > 0 ? rating : [1, 2, 3, 4, 5],
    page,
    ...(radius !== null && radius !== undefined && { radius }),
    ...(centerLatitude !== null && centerLatitude !== undefined && { centerLatitude }),
    ...(centerLongitude !== null && centerLongitude !== undefined && { centerLongitude }),
  };

  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accommodation/getDataWithCondition`
    , requestBody
  );

  return data;

}