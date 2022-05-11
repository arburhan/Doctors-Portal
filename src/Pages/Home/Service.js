import React from 'react';

const Service = ({ service }) => {
    const { image, title, description } = service;
    return (
        <div class="card lg:max-w-lg bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src={image} alt="" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Service;