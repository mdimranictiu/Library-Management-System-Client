import React from 'react';
import { useLocation } from 'react-router-dom';

const Category = () => {
    const location=useLocation();
    const category=location?.state
    return (
        <div>
            <h2>Category: {category} </h2>
        </div>
    );
};

export default Category;