"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/lib/axios";

export default function ContentScheduler() {
  const contentOptions = ["ENTERTAINMENT", "SPORTS", "SCIENCE", "TECHNOLOGY"];
  const maxTimes = 4;

  const [contentChosed, setContentChosed] = useState("ENTERTAINMENT");
  const [country, setCountry] = useState("us");
  const [language, setLanguage] = useState("en");
  const [times, setTimes] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addTime = () => {
    if (times.length >= maxTimes) {
      setErrorMessage(`You can only add up to ${maxTimes} times.`);
      return;
    }
    setErrorMessage("");
    setTimes([...times, ""]);
  };

  const removeTime = (index: number) => {
    const newTimes = times.filter((_, i) => i !== index);
    setTimes(newTimes);
    setErrorMessage("");
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedTimes = times.map((time, i) =>
      i === index ? e.target.value : time
    );
    setTimes(updatedTimes);
    setErrorMessage(""); // Clear error on change
  };

  const convertToUTC = (localTime: string): string => {
    const date = new Date(`1970-01-01T${localTime}:00`);
    return date.toISOString().split("T")[1].slice(0, 5); // Extract HH:mm in UTC
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uniqueTimes = [...new Set(times)];
    if (times.length === 0) {
      setErrorMessage("Please select at least one time.");
      return;
    }
    if (uniqueTimes.length !== times.length) {
      setErrorMessage("Duplicate times are not allowed.");
      return;
    }
    setErrorMessage("");

    // Convert all times to UTC
    const utcTimes = uniqueTimes.map((time) => convertToUTC(time));

    // Sending the data to the backend
    setLoading(true);
    try {
      await axiosInstance.post("/product/auth/twitter/setContent", {
        contentType: contentChosed,
        country,
        language,
        times: utcTimes, // Send UTC times
      });
      router.push("/content/manage"); // Navigate to the next page
    } catch (err) {
      setLoading(false);
      alert("Error occurred somewhere, reload page");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome, Ronnie</h2>
          <p className="text-sm text-gray-600">Schedule your content below</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Content Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select type of content
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setContentChosed(e.target.value)}
              value={contentChosed}
            >
              {contentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Country Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country Code
            </label>
            <input
              type="text"
              placeholder="e.g. US"
              maxLength={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>

          {/* Language Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language Code
            </label>
            <input
              type="text"
              placeholder="e.g. EN"
              maxLength={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select post time
            </label>
            {times.map((time, index) => (
              <div className="flex items-center space-x-2 mb-2" key={index}>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(e, index)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeTime(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            {times.length < maxTimes && (
              <button
                type="button"
                onClick={addTime}
                className="text-sm px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
              >
                Add Time
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span> Loading
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
