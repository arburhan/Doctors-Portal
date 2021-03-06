import React from 'react';
import Banner from './Banner/Banner';
import ContactUs from './ContactUs';
import ExeptionalService from './ExeptionalService';
import Footer from '../Shared/Footer';
import HomeAppoinment from './HomeAppoinment';
import Info from './Info/Info';
import Services from './Services';
import TestMonials from './TestMonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <ExeptionalService></ExeptionalService>
            <HomeAppoinment></HomeAppoinment>
            <TestMonials></TestMonials>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;