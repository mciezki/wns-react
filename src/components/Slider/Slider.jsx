import React, { useState, useEffect } from 'react';

import header1 from '../../images/header/header1.png';
import header2 from '../../images/header/header2.png';
import header3 from '../../images/header/header3.png';
import header4 from '../../images/header/header4.png';
import './Slider.scss'

const sliderChanges = [
    {
        img: header1,
        bigTxt: 'Keep your world in one place',
        smallTxt: 'You can write, find and read everything what is interesting for you. You are everywhere in every place.',
    },
    {
        img: header2,
        bigTxt: 'Have a great adventure',
        smallTxt: "You don't have to worry about boring news - in this place you can read amateur and professional articles in one place.",
    },
    {
        img: header3,
        bigTxt: 'World-wide news',
        smallTxt: 'In our website we are trying to keep informations from all the world. You saw or heard something intresting and you want to share it? Let\'s make the article!',
    },
    {
        img: header4,
        bigTxt: 'Create our universe',
        smallTxt: 'The world is our imagination - write news, share them to the people - make our world better place to live.',
    },
]

const Slider = () => {
    const [img, setImg] = useState(sliderChanges[0].img);
    const [bigTxt, setBigTxt] = useState(sliderChanges[0].bigTxt);
    const [smallTxt, setSmallTxt] = useState(sliderChanges[0].smallTxt);

    useEffect(() => {
        let counter = 1;

        setInterval(() => {
            setImg(sliderChanges[counter].img);
            setBigTxt(sliderChanges[counter].bigTxt);
            setSmallTxt(sliderChanges[counter].smallTxt);

            if (counter >= 3) {
                counter = 0
            } else {
                counter++
            }
        }, 15000);

    }, [])

    return (
        <header>
            <div style={{ backgroundImage: `url(${img})` }} className="slider-photo">
                <div className='header-text-container'>
                    <div className="text">
                        <h2>{bigTxt}</h2>
                        <p>{smallTxt}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Slider;