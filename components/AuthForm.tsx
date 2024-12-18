"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/formSchema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  // const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      if(type === 'sign-up') {
        const newUser = await signUp(data);
        // setUser(newUser);
        if(newUser) router.push('/sign-in')
      }
      if(type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password
        });
        if(response) router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer items-center gap-1 flex">
          <Image src="/icons/logo.png" width={34} height={34} alt="logo" />
          <h1 className="text-20 font-ibm-plex-serif font-bold text-black-1">
            LOVER BANK
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {/* <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your accout to get start"
                : "Please enter your details"}
            </p> */}
          </h1>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "sign-up" && (
            <>
              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="firstName"
                  placeholder="Enter your first name"
                  label="First Name"
                />
                <CustomInput
                  control={form.control}
                  name="lastName"
                  placeholder="Enter your last name"
                  label="Last Name"
                />
              </div>
              <CustomInput
                control={form.control}
                name="address1"
                placeholder="Enter your address"
                label="Address"
              />
              <CustomInput
                control={form.control}
                name="city"
                placeholder="Enter your city"
                label="City"
              />
              <CustomInput
                control={form.control}
                name="state"
                placeholder="Example: NY"
                label="State"
              />
              <CustomInput
                control={form.control}
                name="postalCode"
                placeholder="Example: 11101"
                label="Postal Code"
              />
              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="dateOfBirth"
                  placeholder="yyyy-mm-dd"
                  label="Date Of Birth"
                />
                <CustomInput
                  control={form.control}
                  name="ssn"
                  placeholder="Example: 12345"
                  label="SSN"
                />
              </div>
            </>
          )}
          <CustomInput
            control={form.control}
            name="email"
            placeholder="Enter your email"
            label="Email"
          />
          <CustomInput
            control={form.control}
            name="password"
            placeholder="Enter your password"
            type="password"
            label="Password"
          />
          <div className="flex flex-col gap-4">
            <Button type="submit" className="form-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === "sign-in"
            ? "Don't have an account"
            : "Already have an accoutn"}
        </p>
        <Link
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          className="form-link"
        >
          {type === "sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
