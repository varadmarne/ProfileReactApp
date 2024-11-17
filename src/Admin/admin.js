import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './admin.css';
import { names } from "../names";

const Admin = () => {

  const nav = useNavigate();

  const returnHome=()=>{

    nav('/');
  }
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    job: "",
    description: "",
    location: { lat: 0, lng: 0 },
  });

  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const mapboxAccessToken = "pk.eyJ1IjoidmFyYWRtYXIiLCJhIjoiY20za2g0MmF4MGMybjJxcXpncDA5bGxjNyJ9.kKMOvjl8ufh2VJrlSpgbmw";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMapClick = (e) => {
    const { lng, lat } = e.lngLat;
    setFormData({ ...formData, location: { lat, lng } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.image ||
      !formData.job ||
      !formData.description ||
      formData.location.lat === 0 ||
      formData.location.lng === 0
    ) {
      setError("Please fill in all fields, including selecting a location on the map.");
      return;
    }

    setError("");

    if (editingIndex !== null) {
      // Edit existing entry
      names[editingIndex] = {
        name: formData.name,
        image: formData.image,
        job_role: formData.job,
        description: formData.description,
        location: formData.location,
      };
      setEditingIndex(null); // Reset editing state
    } else {
      // Add new entry
      names.push({
        name: formData.name,
        image: formData.image,
        job_role: formData.job,
        description: formData.description,
        location: formData.location,
      });
    }

    setFormData({
      name: "",
      image: "",
      job: "",
      description: "",
      location: { lat: 0, lng: 0 },
    });

    nav("/");
  };

  const handleEdit = (index) => {
    const entry = names[index];
    setFormData({
      name: entry.name,
      image: entry.image,
      job: entry.job_role,
      description: entry.description,
      location: entry.location,
    });
    setViewport({
      latitude: entry.location.lat,
      longitude: entry.location.lng,
      zoom: 5,
    });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    names.splice(index, 1);
    setFormData({ ...formData });
  };

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
    <div className="Return" style={{width:"95%"}}>
                    <button onClick={returnHome}><FaArrowLeft style={{ marginRight: "5px", color: "#333" }} /></button>
    </div>
    <div className="AdminContainer">
      <h1>{editingIndex !== null ? "Edit Profile" : "Add New Profile"}</h1>
      <form onSubmit={handleSubmit} className="AdminForm">
        {error && <p className="ErrorMessage">{error}</p>}

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="AdminInput"
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="AdminInput"
          />
        </label>
        <label>
          Job Role:
          <input
            type="text"
            name="job"
            value={formData.job}
            onChange={handleInputChange}
            required
            className="AdminInput"
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="AdminTextarea"
          />
        </label>
        <div className="MapContainer">
          <h3>Select Location on Map:</h3>
          <Map
            initialViewState={viewport}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={mapboxAccessToken}
            onClick={handleMapClick}
          >
            <Marker
              longitude={formData.location.lng}
              latitude={formData.location.lat}
              color="red"
            />
          </Map>
        </div>
        <button type="submit" className="AdminButton">
          {editingIndex !== null ? "Update Profile" : "Add Profile"}
        </button>
      </form>

      <h2>Existing Profiles</h2>
      <div className="EditCardsWrapper">
        {names.map((entry, index) => (

            <div className="EditCards">
              
              <img src={entry.image} alt={entry.name} width="50" height="50" />
              <strong>{entry.name}</strong>
              <p>{entry.job_role}</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>

        ))}
      </div>
    </div>
    </div>
  );
};

export default Admin;
