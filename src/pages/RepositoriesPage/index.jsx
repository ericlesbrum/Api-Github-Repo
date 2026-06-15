import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Container, Sidebar, Main, Loading } from "./styles";

import Profile from "./Profile";
import Filter from "./Filter";
import Repositories from "./Repositories";

import { langColors, getLangsFrom } from "../../styles/langConfigColors";

import { getUser, getRepos } from "../../services/api";

export default function RepositoriesPage() {
  const { login } = useParams();

  const [user, setUser] = useState();
  const [repositories, setRepositories] = useState();
  const [currentLanguage, setCurrentLanguage] = useState();
  const [languages, setLanguages] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [userResponse, repositoriesResponse] = await Promise.all([
        getUser(login),
        getRepos(login),
      ]);
      setUser(userResponse.data?.[0]);
      setRepositories(repositoriesResponse.data);
      setLanguages(getLangsFrom(repositoriesResponse.data));

      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Loading>Carregando...</Loading>;

  return (
    <Container>
      <Sidebar>
        <Profile user={user} />
        <Filter
          languages={languages}
          currentLanguage={currentLanguage}
          onClick={(language) => setCurrentLanguage(language)}
        />
      </Sidebar>
      <Main>
        <Repositories
          repositories={repositories}
          currentLanguage={currentLanguage}
        />
      </Main>
    </Container>
  );
}
