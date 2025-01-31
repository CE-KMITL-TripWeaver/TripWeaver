

export interface PlanUpdateInterface {
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

export interface PlanObject {
    
    _id: string;
    startDate: Date;
    dayDuration: number;
    accommodations: {
        accommodationID: string;
    }[];
    tripName: string;
}
  