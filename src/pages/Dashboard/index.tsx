import React from 'react'
//N preciso de definir tipo do da função (do return) pq typescript sabe por causa do jsx

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

import surfStrechImage from '../../resources/images/surfStrech.jpg';
import surfImage from '../../resources/images/surf.jpg';
import velaImage from '../../resources/images/vela.jpg';
import velaSmileImage from '../../resources/images/velaSmile.jpg';

export function Dashboard() {
    return (
        <Carousel>
            <div>
                <img src={surfStrechImage} alt="surfStrech"/>
            </div>
            <div>
                <img src={surfImage} alt="surf"/>
            </div>
            <div>
                <img src={velaImage} alt="velaSmile"/>
            </div>
            <div>
                <img src={velaSmileImage} alt="vela"/>
            </div>
        </Carousel>
    )
}

