import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import ActivityImage from './components/ActivityImage/index.tsx';
import { StyledCarousel } from './styles.ts';

export function ImageCarousel() {

    const surfYoga = "https://www.piratecoastpaddle.com/wp-content/uploads/supyoga-00.jpg"
    const surf = "https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2019-11/e1a9616e-2de5-4893-b491-335379dcede1.jpeg?h=efb04da0&itok=N0GzEuvZ";
    const sailing = "https://images.squarespace-cdn.com/content/v1/5fc56aece2fce462bcaa3993/1614209006400-DHR7913ZE4IUGUE8UY5S/DSC_0223.JPG";
    const kayak = "https://www.clcboats.com/images/photos/gales2013/1-autumngales2013_play-in-tidalrace6.jpg";

    return (
        <StyledCarousel showThumbs={false}>
            <div>
                <ActivityImage src={surfYoga} alt="surfYoga"/>
            </div>
            <div>
                <ActivityImage src={surf} alt="surf"/>
            </div>
            <div>
                <ActivityImage src={sailing} alt="sailing"/>
            </div>
            <div>
                <ActivityImage src={kayak} alt="kayak"/>
            </div>
        </StyledCarousel>
    )
}