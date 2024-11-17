import { useNavigate } from 'react-router-dom';

export default function Cards(props) {
  const profImage = props.image;
  const nav = useNavigate();
  
  function createProfilePage(name) {
    nav(`/profile/${encodeURIComponent(name)}`);
  }

  return (
    <div className="Card">
      <img src={profImage} alt="profile picture" />
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <button onClick={() => createProfilePage(props.name)}>
        Summary
      </button>
    </div>
  );
}