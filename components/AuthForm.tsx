'use client'
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer items-center gap-1 flex">
          <Image src="/icons/logo.jpg" width={34} height={34} alt="logo" />
          <h1 className="text-20 font-ibm-plex-serif font-bold text-black-1">
            LOVER BANK
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in'? 'Sign In' : 'Sign Up' }
            <p className="text-16 font-normal text-gray-600">
              {
                user ? 'Link your accout to get start' : 'Please enter your details'
              }
            </p>
          </h1>
          
        </div>
      </header>
      {
        user ? 
        <div className="flex flex-col gap-4"></div> : <>FROM</>
      }
    </section>
  );
};

export default AuthForm;
