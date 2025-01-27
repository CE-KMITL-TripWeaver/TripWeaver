"use client"
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./calendar.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    tripName: "",
    travelers: 1,
    startLocation: "",
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    }).format(date);
  };

  const dateText = `${formatDate(dateRange[0].startDate)} - ${formatDate(
    dateRange[0].endDate
  )}`;

  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleDateChange = (ranges: any) => {
    const newStartDate = ranges.selection.startDate;
    const newEndDate = ranges.selection.endDate;

    const maxDuration = 90;
    const timeDifference = (newEndDate.getTime() - newStartDate.getTime()) / (1000 * 3600 * 24);

    if (timeDifference > maxDuration) {
      setErrorMessage("ไม่สามารถวันในการวางแผนเกิน 90 วันได้");
    } else {
      setDateRange([ranges.selection]);
    }
  };

  const handleOpenCalendar = () => {
    setOpen(!open);
    setErrorMessage("");
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    
    console.log("Trip Name:", formData.tripName);
    console.log("Travelers:", formData.travelers);
    console.log("Start Location:", formData.startLocation);
    console.log("Start date:", dateRange[0].startDate);

    const timeDifference = (dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) / (1000 * 3600 * 24);
    console.log("Duration:", timeDifference);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex flex-col bg-[#F4F4F4] min-h-screen w-full h-full bg-[url('/images/landscape.jpg')] bg-cover bg-center">
        <NavBar />
        <div className="flex justify-center items-center w-full h-[calc(100vh-84px)]">
          <form
            className="flex flex-col bg-white bg-opacity-90 kanit p-8 mb-40 w-[35%] rounded-2xl shadow-md"
            onSubmit={handleSubmitForm}
          >
            <div className="flex text-xl font-bold justify-center mb-6">
              สร้างทริป
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="tripName" className="font-bold mb-2">
                ชื่อทริป
              </label>
              <input
                type="text"
                id="tripName"
                name="tripName"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="กรอกชื่อทริป"
                value={formData.tripName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-col w-1/2">
                <label htmlFor="travelers" className="font-bold mb-2">
                  จำนวนคน
                </label>
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  min="1"
                  value={formData.travelers}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col w-1/2 relative">
                <label htmlFor="travelDates" className="font-bold mb-2">
                  วันที่ท่องเที่ยว
                </label>
                <input
                  type="text"
                  readOnly
                  value={dateText}
                  onClick={handleOpenCalendar}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer"
                  placeholder="เลือกวันที่"
                />
                {open && (
                  <div ref={pickerRef} className="absolute top-16 z-50 bg-white p-4 shadow-lg rounded-lg">
                    <DateRange
                      onChange={handleDateChange}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      minDate={new Date()}
                      rangeColors={["#3b82f6"]}
                    />
                    {errorMessage && (
                      <div className="text-red-500 mt-2 text-sm">
                        {errorMessage}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-4 mb-6">
              <label htmlFor="startLocation" className="font-bold mb-2">
                เลือกจุดเริ่มต้นการท่องเที่ยว
              </label>
              <select
                id="startLocation"
                name="startLocation"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.startLocation}
                onChange={handleInputChange}
                required
              >
                <option value="">-- กรุณาเลือก --</option>
                <option value="phuket">ภูเก็ต</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
            >
              เริ่มการสร้างทริป
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
