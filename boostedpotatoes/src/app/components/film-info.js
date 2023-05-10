
import React from 'react'

const moviessample = {
    page: 2,
    results: 
        {
            id: "QSDQFQTQZF",
            title: "titre de moviessample",
            img: "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
            trailer: "ljljpoqz",
            description:
                "Dolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magnaDolore magna",
            release_date: "25/02/2022",
            vote_average: 6.2,
            genre: ["action", "prout", "hello"],
            vote_count: 697,
            director_name: "directorname",
            cast: [
                { name: "prout", character: "personnage", picture: "url" },
                { name: "prout2", character: "personnage", picture: "url" },
                { name: "prout3", character: "personnage", picture: "url" },
            ],
            comments: [
                { userid: "prout", content: "c'est de la merde" },
                { userid: "prout", content: "c'est de la merde" },
                { userid: "prout", content: "c'est de la merde" },
            ],
        },



    
};



export default function Film() {
    return (
        
        <div className="hero min-h-screen bg-base-200">
            <div>
                <div className="flex items-center ">
                    <h1 className="text-5xl font-bold"> {moviessample.results.title}</h1>
                    <div className="flex">
                        <div>
                            <h1>Rating</h1>
                            <div className="flex items-center">
                                <img className="w-8 ..." src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png" alt="star" />
                                <p>8,1/10</p>
                            </div>
                        </div>
                        <div>
                            <h1>Your Rating</h1>
                            <div className="flex items-center">
                                <img className="w-8 ..." src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png" alt="star" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <h2> 2013 </h2> - <h2> 1h48</h2>
                </div>
                <div className="hero-content flex-col lg:flex-row">
                </div>
                <div className='flex'>
                    <img src="https://i.ebayimg.com/images/g/IukAAOSwXeJYJCcE/s-l1600.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                    <iframe width="1000" height="703" src="https://www.youtube.com/embed/J7bAZCOk0Sc" title="Under The Skin | Official Trailer HD | A24" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Synopsis</h1>
                    <p className="py-6">A mysterious young woman seduces lonely men in the evening hours in Scotland. However, events lead her to begin a process of self-discovery.</p>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Genre</h1>
                    <p className="py-6">Horreur</p>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Director</h1>
                    <p className="py-6">Jonathan Glazer</p>
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Stars</h1>
                    <div className='flex'>
                        <p className="py-6">Scarlett Johansson, </p>
                        <img src="https://www.refinery29.com/images/10549259.jpg?format=webp&width=720&height=864&quality=85" alt="" className="max-w-xs" />
                    </div>
                    <div className='flex'>
                        <p className="py-6">Jeremy Mc Williams, </p>
                        <img src="https://focus.belfasttelegraph.co.uk/thumbor/za7q1UL8Qg8lZQKau6_oElj3h6g=/0x26:964x558/960x640/prod-mh-ireland/cb3ac6c4-995e-11ed-89e0-0210609a3fe2.png" alt="" className="max-w-xs" />
                    </div>
                    <div className='flex'>
                        <p className="py-6">Lynsey Taylor Mackay </p>
                        <img src="https://images.mubicdn.net/images/cast_member/419025/cache-252045-1504418658/image-w856.jpg" alt="" className="max-w-xs" />
                    </div>
                </div>
            </div>
        </div>

    );

}