import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useGeoLocation from "./useGeoLocation";
import RightSection from "./RightSection";
import "./index.css";

function App() {
    const x = new Date();
    const [curr, setCurr] = useState(x);
    // const [y, setY] = useState(null);
    // const [z, setZ] = useState(null);
    const [city, setCity] = useState(null);
    const [temp, setTemp] = useState(null);
    const [a, setA] = useState(null);
    const location = useGeoLocation();
    const location2 = JSON.stringify(location.coordinates.lat);
    const location3 = JSON.stringify(location.coordinates.lng);
//     console.log(location2, location3);
    useEffect(() => {
        const fetchApi = async () => {
            // setX(true);
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location2}&lon=${location3}&units=metric&appid=aac86e38c6df410e6010639de4a0a13f`;
            const response = await fetch(url);
            const resJson = await response.json();
//             console.log(resJson);
            setCity(resJson.name);
            setA(resJson.sys.country);
            setTemp(resJson.main.temp);
        }
        fetchApi();
    });
    const func = () => {
        const y = new Date();
        setCurr(y);
    }
    //   setInterval(func, 1000);
    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <>
            <div className="container vh-100 w-75 d-flex align-items-center justify-content-center main" id="sw">
                <div className="row h-75 w-100">
                    <div className="col-md-8 bg-left p-4 d-flex flex-column justify-content-end">
                        <h2 className="text-end text-white display-6 fw-normal">Shiv Shakti Nagar</h2>
                        <h2 className="text-end text-white display-6 fw-normal">{a}</h2>
                        <div className="row mt-auto text-white">
                            <div className="col-7">
                                <h2 className="display-4 fw-normal">{curr.getHours() < 10 ? "0" + curr.getHours() : curr.getHours()}:{curr.getMinutes() < 10 ? "0" + curr.getMinutes() : curr.getMinutes()}:{curr.getSeconds() < 10 ? "0" + curr.getSeconds() : curr.getSeconds()}</h2>
                                <h3 className="fw-normal">{day[curr.getDay()]}, {curr.getDate()} {month[curr.getMonth()]} {curr.getFullYear()}</h3>
                            </div>
                            <div className="col-5">
                                <h1 className="display-1 fw-normal">{Math.round(temp)}°c</h1>
                            </div>
                        </div>
                    </div>
                    <RightSection cityp={city} />
                </div>
            </div>
        </>
    );
}
export default App;
