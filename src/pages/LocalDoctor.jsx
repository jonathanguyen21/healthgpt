import React, { useState } from "react";
import "./LocalDoctor.css";

const LocalDoctor = () => {
  const handleDoctorSearch = async () => {
    const successCallback = (position) => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json
      ?keyword=health
      &location=${position.coords.latitude}%2C${position.coords.longitude}
      &radius=10500
      &type=hospital|pharmacy|doctor
      &key=${import.meta.env.VITE_GOOGLE_API}`,
        {
          mode: "cors",
        }
      ).then((data) => {
        console.log(data);
      });
      console.log(position);
    };
    const errorCallback = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-24 text-center">Find a Doctor Near You</div>
      <div>Hello Where are you</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          handleDoctorSearch();
        }}
      >
        Find Doctors Near Me
      </button>
    </div>
  );
};

export default LocalDoctor;
