"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { useTranslations } from 'next-intl';

export default function Register() {
    const t = useTranslations();

    return (
        <>
            <NavBar />

            <div className="relative min-h-screen flex flex-col items-center justify-center">

                <div className="absolute inset-0 -z-10 w-full h-full">
                    <Image
                        src="/th/images/authbg.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                        quality={75}
                        priority
                    />
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>

                {/* Signup form container */}
                <div className="relative bg-white bg-opacity-90 p-10 rounded-3xl shadow-lg max-w-3xl w-full z-10 translate-y-[-40px]">
                    <h2 className="text-3xl kanit font-extrabold text-center text-gray-800 mb-6">{t('Register.signup')}</h2>

                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder={t('Register.username')}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 kanit"
                        />
                        <input
                            type="email"
                            placeholder={t('Register.email')}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 kanit"
                        />
                        <input
                            type="password"
                            placeholder={t('Register.password')}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 kanit"
                        />
                        <input
                            type="password"
                            placeholder={t('Register.confirmPassword')}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 kanit"
                        />

                    </form>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-1/2 py-3 mt-10 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 kanit"
                        >
                            {t('Register.signup')}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-300" />
                        <span className="mx-2 text-gray-400 kanit font-extrabold">{t('Register.or')}</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    {/* Google signup button */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="w-1/2 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md flex items-center justify-center bg-white hover:bg-gray-100 kanit"
                        >
                            <Image src="/th/images/google-logo.png" alt="Google" width={30} height={30} className="mr-2" />
                            {t('Register.signupWithGoogle')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
