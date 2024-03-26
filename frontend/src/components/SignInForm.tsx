"use client";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axiosInstance from "..//..//lib/axiosConfig";

import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";

function SignInForm() {
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
            <Input type="text" placeholder="Your username" required />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Your password" required />
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Sign-in
          </Button>
        </VStack>
      </Flex>
    </>
  );
}

export default SignInForm;
