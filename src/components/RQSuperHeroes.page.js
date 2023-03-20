import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  useAddSuperHeroData,
  useSuperHeroesData
} from "../hooks/useSuperHeroes.page";

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, refetch } = useSuperHeroesData();
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const { mutate: addHero } = useAddSuperHeroData();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  return (
    <>
      <div>RQSuperHeroes</div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
