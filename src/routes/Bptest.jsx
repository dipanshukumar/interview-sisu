import React, { useState } from "react";
const Bptest = () => {
  const [systolic, setSystolic] = useState(0);
  const [diastolic, setDiastolic] = useState(0);
  const [heart, setHeart] = useState(0);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState(null);
  const [completed, setCompleted] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const pressure = (syst, dias, pulse) => {
    setCompleted(false);
    setSuccess(null);
    setError(null);
    setEvents(null);
    setSystolic(syst);
    setDiastolic(dias);
    setHeart(pulse);
  };
  const configureSimulator = async () => {
    setSuccess(null);
    setError(null);
    setEvents(null);
    setCompleted(false);
    const url = "http://localhost:3000";
    const data = {
      systolic: systolic,
      diastolic: diastolic,
      pulse: heart,
    };
    // The data to be sent in the request body
    const session = {
      sessionId: "session_1641234567890",
    };

    try {
      // calling the first api to configure the simulator
      const res1 = await fetch(`${url}/api/blood-pressure/configure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res1.ok) throw new Error(`HTTP error! status: ${res1.status}`);
      const data1 = await res1.json();
      setSuccess(data1.message);
      // wait for 2 seconds before calling the second api to show the message
      await delay(2000);
      // calling the second api to start the stream
      const res2 = await fetch(`${url}/api/blood-pressure/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session), // Example dependent payload
      });

      if (!res2.ok) throw new Error(`HTTP error! status: ${res2.status}`);
      const data2 = await res2.json();
      console.log(data2);
      setSuccess(
        `${data2.message}, it will take around ${
          data2.estimatedDuration / 1000
        } seconds`
      );
      const streamUrl = `${url}${data2.streamUrl}`;

      // Connecting to the stream
      const eventSource = new EventSource(streamUrl);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setEvents(data.message);
        if (data.status === "complete") {
          setDiastolic(data.reading.diastolic);
          setSystolic(data.reading.systolic);
          setHeart(data.reading.pulse);
          setCompleted(true);
          eventSource.close();
        }
        // console.log("Stream event:", data);
      };

      eventSource.onerror = (err) => {
        // console.error("Stream error:", err);
        setError(err.message);
        eventSource.close();
      };
    } catch (err) {
      // console.error(err);
      setError(`Error: ${err.message}`);
    }
  };
  return (
    <section className="bptest">
      <h3>📋 Simulator Configuration</h3>
      <h4>
        Set the target values that ALL blood pressure readings will return:
      </h4>
      <form>
        <div className="form-group">
          <fieldset>
            <label htmlFor="systolic">
              <b>Systolic Pressure</b>
              <b>(mmHg):</b>
            </label>
            <input
              type="number"
              id="systolic"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="diastolic">
              <b>Diastolic Pressure</b>
              <b>(mmHg):</b>
            </label>
            <input
              type="number"
              id="diastolic"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="heart">
              <b>Heart Rate</b>
              <b>(BPM):</b>
            </label>
            <input
              type="number"
              id="heart"
              value={heart}
              onChange={(e) => setHeart(e.target.value)}
            />
          </fieldset>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="low"
            onClick={() => pressure(80, 65, 58)}
          >
            Low
          </button>
          <button
            type="button"
            className="normal"
            onClick={() => pressure(120, 80, 72)}
          >
            Normal
          </button>
          <button
            type="button"
            className="elevated"
            onClick={() => pressure(135, 85, 78)}
          >
            Elevated
          </button>
          <button
            type="button"
            className="high"
            onClick={() => pressure(155, 95, 85)}
          >
            High
          </button>
        </div>
        <>
          {success && <h3 className="success">{success}</h3>}
          {events && (
            <h3 className="events">
              Events:<span>{events}</span>
            </h3>
          )}
          {error && <h3 className="error">{error}</h3>}
          {completed && (
            <div className="completed">
              <h4
                className={
                  systolic > 135 ? "red" : systolic < 110 ? "blue" : "green"
                }
              >
                Systolic Pressure: <span>{systolic}</span>
              </h4>
              <h4
                className={
                  diastolic > 85 ? "red" : diastolic < 70 ? "blue" : "green"
                }
              >
                Diastolic Pressure: <span>{diastolic}</span>
              </h4>
              <h4
                className={heart > 78 ? "red" : heart < 65 ? "blue" : "green"}
              >
                Heart Rate: <span>{heart}</span>
              </h4>
            </div>
          )}
        </>
        <button
          className="simulate-button"
          type="button"
          onClick={() => configureSimulator()}
        >
          Configure Simulator
        </button>
      </form>
    </section>
  );
};

export default Bptest;
