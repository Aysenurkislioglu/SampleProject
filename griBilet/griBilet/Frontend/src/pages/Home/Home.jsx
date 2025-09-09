import React from 'react'
import "./Home.scss";
import "../Home/fotoSlider/PhotoSlider.jsx"
import PhotoSlider from '../Home/fotoSlider/PhotoSlider.jsx';
import Categories from './categories/Categories.jsx';
import FilterSidebar from './filterSideBar/FilterSideBar.jsx';
import EventsGrid from './eventsGrid/EventsGrid.jsx';

export default function Home() {
    return (

        <div className='homepage'>
            <PhotoSlider></PhotoSlider>

           <div className='categories'>
                <Categories></Categories>
           </div>
           <div className='main'>
                <div className='filter'>
                    <FilterSidebar></FilterSidebar>
                </div>

                <div className='events'>
                    <EventsGrid></EventsGrid>
                </div>


           </div>

        </div>
    )
}
