import React from 'react';

import './OpeningHours.css';
import BackButton from "./BackButton.jsx";

const OpeningHours = () => (
    <div>
        <BackButton/>
        <div calss="container">
            <div class="openingHours"><h1>שעות פתיחה</h1></div>

            <div class="clinic">
                <h2>מרפאה</h2>
                <p> ראשון - חמישי: 6:00 - 11:00, 13:00 - 17:00</p>
                <p> שישי - שבת: 8:00 - 10:00</p>
                <p>טלפון: 04-6062629</p>
            </div>

            <div class="pool">
                <h2>בריכה</h2>
                <p> ראשון - שישי: 6:00 - 13:00, 15:00 - 19:00</p>
                <p> שבת: 7:00 - 12:00</p>
                <p>טלפון: 04-1234567</p>
            </div>

            <div class="gym">
                <h2>חדר כושר</h2>
                <p> ראשון - חמישי: 8:00 - 19:00</p>
                <p>טלפון: 04-1852967</p>
            </div>

            <div class="gym">
                <h2>מסעדה</h2>
                <p> ראשון - שישי: 6:00 - 13:00, 15:00 - 19:00</p>
                <p> שבת: 7:00 - 12:00</p>
                <p>טלפון: 04-7654321</p>
            </div>

            <div>
                <h1>שעות פתיחה</h1>
                <p>ימים ראשון עד חמישי: 9:00 - 17:00</p>
                <p>יום שישי: 9:00 - 13:00</p>
                <p>יום שבת: 9:00 - 13:00</p>
                <p>ערב חג: 9:00 - 13:00</p>
            </div>

        </div>
    </div>
);

export default OpeningHours;