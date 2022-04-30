import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./App.css";
const App = () => {
  const [heroesData, setHeroesData] = useState([]);
  const [hero, setHero] = useState("");

  const fetchHeroes = (e) => {
    // e.preventDefault();
    fetch(
      `https://superhero-search.p.rapidapi.com/api/${
        hero ? `?hero=${hero}` : "heroes"
      }`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "superhero-search.p.rapidapi.com",
          "X-RapidAPI-Key":
            "af711e5c7emsh5b19a7bf4f305eep179ce5jsn26d4437daba4",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        !hero ? setHeroesData(data) : setHeroesData([data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchHeroes(), []);

  return (
    <div className="app-container">
      <div className="app">
        <Typography variant="h2" textAlign="center">
          HEROES
        </Typography>

        <form className="form">
          <TextField
            type="text"
            name="heroName"
            onChange={(e) => setHero(e.target.value)}
            className="search-input"
            placeholder={"Search hero"}
          />
          <Button variant="contained" onClick={fetchHeroes}>
            {hero.length ? "Get hero" : "Get heroes"}
          </Button>
        </form>

        {/* <h1>vash geroi:{heroesData?.name}</h1>
        <p>{Math.round(heroesData?.main)}</p> */}
        <div className="row">
          {heroesData.length > 0
            ? heroesData.map((hero) => (
                <div key={hero.id} className="col-3">
                  <Typography variant="h4" textAlign="center">
                    {hero.name}
                  </Typography>
                  <Typography variant="h5" textAlign="center">
                    {hero.biography.publisher}
                  </Typography>
                  <img src={hero.images.md} alt={hero.name} />
                  <div>
                    <Typography variant="h6">
                      combat: {hero.powerstats.combat}
                    </Typography>
                    <Typography variant="h6">
                      durability: {hero.powerstats.durability}
                    </Typography>
                    <Typography variant="h6">
                      intelligence: {hero.powerstats.intelligence}
                    </Typography>
                    <Typography variant="h6">
                      power: {hero.powerstats.power}
                    </Typography>
                    <Typography variant="h6">
                      speed: {hero.powerstats.speed}
                    </Typography>
                    <Typography variant="h6">
                      strength: {hero.powerstats.strength}
                    </Typography>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default App;
