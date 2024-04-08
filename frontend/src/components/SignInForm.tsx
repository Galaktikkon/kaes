"use client";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Flex,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();

  const handleSignIn = () => {
    signIn("credentials", { username, password, redirect: false });
  };

  useEffect(() => {
    if (session.data?.expires) {
      window.location.href = "/";
    }
  }, [session]);
  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        margin={[0, 0, 0, 10]}
      >
        <VStack spacing="4" align="stretch" maxW="md" m="auto">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Your username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="teal" onClick={handleSignIn}>
            Sign-in
          </Button>
          <Link href={"/signup"}>Sign-up</Link>
        </VStack>
      </Flex>
    </>
  );
}

export default SignInForm;
