import "./ProfileIndex.css";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import { names } from "../names";

export default function ProfIndex() {

    const [searchTerm, setSearchTerm] = useState('');
    const [SearchedCards, setSearchedCards] = useState(names);

    const nav = useNavigate();
    const navToAdmin=()=>{

        nav('/admin');
    }
    const handleSearchChange = (event) => {

        console.log(event);
        const value = event.target.value;
        setSearchTerm(value);
        if (value === '') {
            setSearchedCards(names);
        } else {
            const filtered = names.filter(
                (card) =>
                    card.name.toLowerCase().includes(value.toLowerCase())

            );
            setSearchedCards(filtered);
        }
    };
    return (
        <>
            <div className="MainWrapper">

                <div className="Navbar">
                    <input type="text" placeholder="Search names of profiles" value={searchTerm} onChange={handleSearchChange} />
                    <button className="DeskButton" onClick={navToAdmin}>Admin Dashboard</button>
                    <button className="MobileButton" onClick={navToAdmin}>Admin</button>
                </div>

                <div className="CardSection">
                    <div className="Wrapper">
                        {SearchedCards.length > 0 ? (
                            SearchedCards.map((name) => <Cards key={name.name} {...name} />)
                        ) : (
                            <div className="NotFound">Profile not found</div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
