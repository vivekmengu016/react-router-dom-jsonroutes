import React from "react";
import { Outlet } from "react-router-dom";

export const Home = () => <div>Home <Outlet/> </div>
export const AboutUs = () => <div>About Us Page <Outlet /></div>
export const ContactUs = () => <div>Contact Us</div>
export const Dashboard = () => <div>App Dashboard</div>
export const Products = () => <div>Prodcust <Outlet /></div>
export const SingleProduct = () => <div>Single Products <Outlet /></div>
export const SingleProductEdit = () => <div> Edit this product </div>
export const Reviews = () => <div>Reviews <Outlet /></div>
export const Login = () => <div>Login</div>
export const FourZeroFour = () => <div>Four Zero Four</div> 