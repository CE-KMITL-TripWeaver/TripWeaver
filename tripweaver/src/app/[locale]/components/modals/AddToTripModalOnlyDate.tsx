import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { PlanObject } from "../../interface/plantripObject";
import TripDate from "../TripDateComponent";

interface AddToTripModalProps {
  isOpen: boolean;
  startDate: Date;
  dayDuration: number;
  //selectedLocation: string;
  //dayIndex: number;
  //locationType: string;
  onClose: () => void;
  //onAddTrip: (planID: string, locationID: string) => void;
  onChangeDate: (index: number) => void;
}

const AddToTripModalOnlyDate: React.FC<AddToTripModalProps> = ({
  isOpen,
  startDate,
  dayDuration,
  onClose,
  onChangeDate
}) => {

  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add to trip</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <Icon icon="iconoir:cancel" className="text-lg text-[#414141]" width={24} height={24} />
            </button>
          </div>

            <div className="flex w-full mt-5">
              <TripDate startDate={startDate} durationDate={dayDuration} onSelectDay={onChangeDate}/>
            </div>   
          {/*
            selectedPlan && locationType == "ACCOMMODATION" && selectedPlan.accommodations && selectedPlan.accommodations.length > 0 && selectedPlan.accommodations[dayIndex] && selectedPlan.accommodations[dayIndex].accommodationID != "" && (
              <div className="flex flex-row text-red-600 w-full mt-5">
                <div className="flex justify-center items-center mr-2">
                  <Icon icon="fe:warning" className="text-lg text-red-600" width={24} height={24} />
                </div> 
                <div className="flex justify-center items-center kanit text-sm text-center">
                  วันดังกล่าวมีที่พักอยู่แล้วระบบจะทำการแทนที่ของที่พัก
                </div>
              </div>  
            )
          */}

          <button
            //onClick={() => selectedPlan && onAddTrip(selectedPlan._id, selectedLocation)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            //disabled={!selectedPlan}
          >
            Add to Trip
          </button>
        </div>
      </div>
    )
  );
};

export default AddToTripModalOnlyDate;
