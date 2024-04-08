import { Button, ChakraProvider, Container, Flex } from "@chakra-ui/react";
import SignInForm from "../src/components/SignInForm";
import SignUpForm from "@/src/components/SignUpForm";
import Header from "@/src/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container
        size={"md"}
        h={"100vh"}
        centerContent
        justifyContent={"center"}
      >
        <Button>Play the game!</Button>
      </Container>
    </>
  );
}
