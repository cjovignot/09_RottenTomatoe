
import React from 'react'


export default function Film() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div>
                <h1 className="text-5xl font-bold"> Under The Skin </h1>
                <div className="flex items-center">
                    <h2> 2013 </h2> - <h2> 1h48</h2>
                </div>
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://i.ebayimg.com/images/g/IukAAOSwXeJYJCcE/s-l1600.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );

}