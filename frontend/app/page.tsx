"use client";

import { Container, Flex } from "@chakra-ui/react";
import { observer } from "mobx-react";
import Header from "@/src/components/Header";
import GameMenu from "@/src/components/Game/Menu/GameMenu";
import UserStatsPanel from "@/src/components/UserStats/UserStatsPanel";

const Home = observer(() => {
  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      <Flex flexDirection={"row"}>
        <Container
          justifyContent={"left"}
          alignItems={"left"}
          width={window.innerWidth / 3}
          height={window.innerHeight}
        >
          <Flex
            justify="flex-end"
            position="absolute"
            top="65"
            left="0"
            padding={5}
          >
            <UserStatsPanel />
          </Flex>
        </Container>

        <Container
          centerContent
          justifyContent={"center"}
          alignItems={"center"}
          alignSelf={"stretch"}
          display={"flex"}
          flex={1}
          width={window.innerWidth / 3}
          height={window.innerHeight}
        >
          <GameMenu />
        </Container>
        <Container width={window.innerWidth / 3} height={window.innerHeight} />
      </Flex>
    </Flex>
  );
});

export default Home;
