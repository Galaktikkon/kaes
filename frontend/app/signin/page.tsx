import SignInForm from "@/src/components/SignInForm";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container size={"md"} h={"100vh"} centerContent justifyContent={"center"}>
      <SignInForm />
    </Container>
  );
}
