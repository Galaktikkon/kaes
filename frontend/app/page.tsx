import { ChakraProvider, Flex } from "@chakra-ui/react";
import SignInForm from "../src/components/SignInForm";
import SignUpForm from "@/src/components/SignUpForm";

export default function Home() {
  return (
    <>
      <ChakraProvider>
        <Flex justifyContent={"center"} align={"center"}>
          <SignUpForm />
          <SignInForm />
        </Flex>
      </ChakraProvider>
    </>
  );
}
