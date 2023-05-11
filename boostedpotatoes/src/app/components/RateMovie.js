"use client"
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function rateMovie() {


    return (
        <div className="rating rating-md">
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
        </div>
    );
};