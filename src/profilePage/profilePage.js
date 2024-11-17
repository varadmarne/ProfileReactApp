import React, { useState } from "react";
import { useParams,  useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { names } from "../names";
import { FaArrowLeft } from "react-icons/fa";
import "./profilePage.css";

export default function Profile() {
    const { name } = useParams();
    const profile = names.find((person) => person.name === name);
    const nav= useNavigate();
    const returnHome =()=>{

        nav('/');
    }
    const [isMapLoading, setIsMapLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (!profile || !profile.location || isNaN(profile.location.lat) || isNaN(profile.location.lng)) {
        console.error("Invalid location data:", profile?.location);
        return <div>Location data is missing or invalid.</div>;
    }

    const profImg = "/images/profile.jpg";
    const MAPBOX_TOKEN = "pk.eyJ1IjoidmFyYWRtYXIiLCJhIjoiY20za2g0MmF4MGMybjJxcXpncDA5bGxjNyJ9.kKMOvjl8ufh2VJrlSpgbmw"; // Replace with your token

    return (
        <div className="ProfileWrapper">
            <div className="Return">
                    <button onClick={returnHome}><FaArrowLeft style={{ marginRight: "5px", color: "#333" }} /></button>
            </div>
            <div className="Description">
                <div className="ImageWrapper">
                    <img src={profImg} alt="profile" />
                </div>
                <div className="ProfileInfo">
                    <h2>{profile.name}</h2>
                    <h4>{profile.job_role}</h4>
                    <p>{profile.description}</p>
                </div>
            </div>
            <div className="MapWrapper">
                <div className="MapText">
                    <h3>Coordinates:</h3>
                    
                    <p>Latitude: {profile.location.lat}</p>    
                    <p>Longitude: {profile.location.lng}</p>
                </div>

                {isMapLoading && !hasError && (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <div className="spinner"></div>
                        <p>Loading map...</p>
                    </div>
                )}
                {hasError && (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <p style={{ color: "red" }}>Map not available</p>
                    </div>
                )}
                {!hasError && (
                    
                    <Map
                        initialViewState={{
                            longitude: profile.location.lng,
                            latitude: profile.location.lat,
                            zoom: 7
                        }}
                        style={{ width: "70vw", height: "50vh", borderRadius: "2em" }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        mapboxAccessToken={MAPBOX_TOKEN}
                        onLoad={() => setIsMapLoading(false)}
                        onError={() => {
                            setIsMapLoading(false);
                            setHasError(true);
                        }}
                    >
                        <Marker
                            longitude={profile.location.lng}
                            latitude={profile.location.lat}
                        >
                        </Marker>
                    </Map>
                )}
            </div>
        </div>
    );
}
