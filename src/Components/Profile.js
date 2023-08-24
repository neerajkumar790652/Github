import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState('neerajkumar790652');
  const [repositories, setRepositories] = useState([]);

  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const profile = await fetch(`https://api.github.com/users/${username}`);
      const profileJson = await profile.json();

      const repositories = await fetch(profileJson.repos_url);
      const repoJson = await repositories.json();

      setData(profileJson);
      setRepositories(repoJson);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    submitHandler();
  }, []); // This will run once when the component mounts

  return (
    <>
      <div className="Search">
        <h1>Search for Username</h1>
        <input type="text" placeholder="Enter Username" value={username} onChange={onChangeHandler} />
        <button onClick={submitHandler}>Search</button>
      </div>
      <div className="main-profile">
        <div className="upper-profile">
          <div className="image">
            <img src={data.avatar_url} alt="not found" />
          </div>
          <div className="content">
            <h2>{data.login}</h2>
            <h3>{data.node_id}</h3>
            <p>{data.created_at}</p>
          </div>
        </div>
        <div className="lower-profile">
          <span>Following</span>
          <p>{data.following}</p>
          <span>Repos</span>
          <p>{data.public_repos}</p>
          <span>Followers</span>
          <p>{data.followers}</p>
        </div>
      </div>
      <div className="Repo">
        <h2>Repo List</h2>
        <p># Name</p>
        {repositories.map((value, index) => (
          <ul key={index}>
            <li>{value.name}</li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Profile;
