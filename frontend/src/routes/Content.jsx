import { axios } from "../utils/axios"
import { useState, useEffect, useRef } from "react"
import { Navigate, useNavigate } from "react-router-dom"
const TimePicker = () => {
  const [times, setTimes] = useState([""])
  const [errorMessage, setErrorMessage] = useState("")

  const maxTimes = 4

  // Add a new time input field
  const addTime = () => {
    if (times.length >= maxTimes) {
      setErrorMessage(`You can only add up to ${maxTimes} times.`)
      return
    }
    setErrorMessage("")
    setTimes([...times, ""])
  }

  // Remove a time input field
  const removeTime = (index) => {
    const newTimes = times.filter((_, i) => i !== index)
    setTimes(newTimes)
    setErrorMessage("")
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const uniqueTimes = [...new Set(times)]
    if (times.length === 0) {
      setErrorMessage("Please select at least one time.")
      return
    }
    if (uniqueTimes.length !== times.length) {
      setErrorMessage("Duplicate times are not allowed.")
      return
    }
    setErrorMessage("")
    alert(`Submitted times: ${times.join(", ")}`)
    // Here you can send the times to your API
  }

  // Handle time input change
  const handleTimeChange = (e, index) => {
    const updatedTimes = times.map((time, i) =>
      i === index ? e.target.value : time,
    )
    setTimes(updatedTimes)
    setErrorMessage("") // Clear error on change
  }

  return (
    <div className="w-full max-w-md bg-base-300 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-center">
        Select API Trigger Times
      </h2>

      <form onSubmit={handleSubmit} className="form-control space-y-4">
        <div className="space-y-2">
          {times.map((time, index) => (
            <div className="flex items-center gap-2" key={index}>
              <input
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(e, index)}
                className="input input-bordered bg-base-100 text-white w-full"
                required
              />
              <button
                type="button"
                onClick={() => removeTime(index)}
                className="btn btn-sm bg-error text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addTime}
            className="btn btn-sm bg-base-100"
          >
            Add Time
          </button>
          <button type="submit" className="btn btn-sm bg-primary text-white">
            Submit
          </button>
        </div>

        {errorMessage && (
          <p className="text-error text-sm mt-2">{errorMessage}</p>
        )}
      </form>
    </div>
  )
}
const ContentType = ({ name }) => {
  const content = ["ENTERTAINMENT", "SPORTS", "SCIENCE", "TECHNOLOGY"]
  const [loading, setLoading] = useState(null)
  const [contentChosed, setContentChosed] = useState("ENTERTAINMENT")
  const [country, setCountry] = useState("us")
  const [language, setLanguage] = useState("en")
  const [times, setTimes] = useState([""])
  const [errorMessage, setErrorMessage] = useState("")

  const maxTimes = 4
  const navigate = useNavigate()

  const addTime = () => {
    if (times.length >= maxTimes) {
      setErrorMessage(`You can only add up to ${maxTimes} times.`)
      return
    }
    setErrorMessage("")
    setTimes([...times, ""])
  }

  const removeTime = (index) => {
    const newTimes = times.filter((_, i) => i !== index)
    setTimes(newTimes)
    setErrorMessage("")
  }

  const handleTimeChange = (e, index) => {
    const updatedTimes = times.map((time, i) =>
      i === index ? e.target.value : time,
    )
    setTimes(updatedTimes)
    setErrorMessage("") // Clear error on change
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const uniqueTimes = [...new Set(times)]
    if (times.length === 0) {
      setErrorMessage("Please select at least one time.")
      return
    }
    if (uniqueTimes.length !== times.length) {
      setErrorMessage("Duplicate times are not allowed.")
      return
    }
    setErrorMessage("")

    // Sending the data to the backend
    setLoading(true)
    axios
      .post("/product/auth/twitter/setContent", {
        contentType: contentChosed,
        country,
        language,
        times: uniqueTimes,
      })
      .then(function (data) {
        console.log(data)
        navigate("/product/twitter/list")
      })
      .catch((err) => {
        setLoading(false)
        alert("Error occurred somewhere, reload page")
      })
  }

  return (
    <>
      <p className="text-base text-center leading-7">Welcome {name}</p>
      <p className="text-base text-center leading-7">Select One</p>
      <hr className="mb-2" />

      <form onSubmit={handleSubmit}>
        {/* Content Selection */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select type of content</span>
          </label>
          <select
            className="input-bordered input"
            onChange={(e) => setContentChosed(e.target.value)}
            value={contentChosed}
          >
            {content.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        {/* Country Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter country code</span>
          </label>
          <input
            className="input input-bordered"
            maxLength={2}
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </div>

        {/* Language Input */}
        <div className="form-control my-2">
          <label className="label">
            <span className="label-text">Enter language code</span>
          </label>
          <input
            className="input input-bordered"
            maxLength={2}
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          />
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <label className="label">
            <span className="label-text">
              Select the time your contents should post
            </span>
          </label>
          {times.map((time, index) => (
            <div className="flex items-center gap-2" key={index}>
              <input
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(e, index)}
                className="input input-bordered bg-base-100 text-white w-full"
                required
              />
              <button
                type="button"
                onClick={() => removeTime(index)}
                className="btn btn-sm bg-error text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {errorMessage && (
          <p className="text-error text-sm mt-2">{errorMessage}</p>
        )}

        <div className="flex justify-between mt-4">
          {times.length < maxTimes && (
            <button
              type="button"
              onClick={addTime}
              className="btn btn-sm bg-base-100"
            >
              Add Time
            </button>
          )}
          <button type="submit" className="btn btn-sm bg-primary text-white">
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
    </>
  )
}

export function AccountList() {
  const [user, setUser] = useState(null)
  const hasRun = useRef(false)
  const navigate = useNavigate()
  const handleRemove = () => {
    axios
      .delete("/product/auth/twitter/remove")
      .then(() => navigate("/product/content/manage"))
  }
  useEffect(function () {
    axios.get("/product/auth/twitter/user").then(({ data }) => {
      console.log(17377)
      hasRun.current = true
      if (data?.name) return setUser(data.name)
      setUser(false)
      navigate("/product/content/manage")
      hasRun.current = true
    })
  }, [])

  return (
    hasRun.current === true &&
    user && (
      <>
        <main className="grid place-items-center px-4 py-24 h-full sm:py-32 lg:px-6">
          <div className="border-[1px] px-6 py-2 w-1/2 rounded-md border-solid bg-base-200">
            <p className="text-base text-center leading-7">Select One</p>
            <hr className="mb-2" />
            <div className="flex items-center justify-between mb-2">
              <p className="text-base text-center leading-7">{user}</p>
              {!false && (
                <button
                  onClick={handleRemove}
                  className="btn bg-base-100 px-1 w-16"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </main>
      </>
    )
  )
}
export default function Content() {
  const [authUrl, setAuthUrl] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(
    function () {
      if (authUrl) window.location.href = authUrl
    },
    [authUrl],
  )
  useEffect(function () {
    axios.get("/product/auth/twitter/user").then(({ data }) => {
      if (data?.name) return setUser(data.name)
      setUser(false)
    })
  }, [])
  const handleClick = () => {
    axios
      .get("/product/auth/twitter/get_auth_url")
      .then(({ data }) => setAuthUrl(data.url))
      .catch(console.error)
  }

  return (
    <>
      <main className="grid place-items-center h-full px-4 py-24 sm:py-32 lg:px-6">
        <div className="border-[1px] w-1/2 p-2  rounded-md border-solid bg-base-200">
          {user === false ? (
            <>
              {" "}
              <div className="">
                <p className="text-base text-center mb-6 leading-7">
                  Connect your twitter account
                </p>

                <button
                  onClick={handleClick}
                  className="btn bg-base-100 px-1 btn-block"
                >
                  Login with X (Twitter){" "}
                </button>
              </div>
            </>
          ) : (
            <>
              <ContentType name={user} />
            </>
          )}
        </div>
      </main>
    </>
  )
}
