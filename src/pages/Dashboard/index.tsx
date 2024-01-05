import React from 'react'
//N preciso de definir tipo do da função (do return) pq typescript sabe por causa do jsx

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

import surfImage from '../../resources/images/surf.jpg';

export function Dashboard() {
    return (
        <img src={surfImage} alt="surf"/>
        // <Carousel>
        //     <div>
        //         <img src='../../resources/images/surfStrech.jpg' alt="surfStrech"/>
        //         {/* <p className="legend">Legend 1</p> */}
        //     </div>
        //     <div>
        //         <img src='./surf.jpg' alt="surf"/>
        //         {/* <p className="legend">Legend 2</p> */}
        //     </div>
        //     <div>
        //         <img src='../../resources/images/velaSmile.jpg' alt="velaSmile"/>
        //         {/* <p className="legend">Legend 3</p> */}
        //     </div>
        //     <div>
        //         <img src='../../resources/images/vela.jpg' alt="vela"/>
        //         {/* <p className="legend">Legend 3</p> */}
        //     </div>
        // </Carousel>
    )
}

