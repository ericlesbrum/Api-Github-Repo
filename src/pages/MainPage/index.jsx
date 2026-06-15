import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Logo,
  Title,
  Subtitle,
  Form,
  Input,
  Button,
} from "./styles";

import logoIcon from "../../assets/react.svg";

export default function Main() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && login.trim()) {
      navigate(`/${login}/repositories`);
    }
  };

  return (
    <Container>
      <Logo src={logoIcon} />
      <Title>API Github</Title>
      <Subtitle>Explore perfis e repositórios do GitHub</Subtitle>
      <Form>
        <Input
          placeholder="Digite o link do usuário"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          onKeyDown={handleKeyDown}
        ></Input>
        <Button to={`/${login}/repositories`}>
          <MdSearch size={42} />
        </Button>
      </Form>
    </Container>
  );
}
