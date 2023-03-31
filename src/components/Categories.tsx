import React from 'react';
import lst_categories from '../indexes/categories.json'

// const lst_categories = []; 

const Categories = () => {
    const newArr = lst_categories.map( (elem) => {
            return <div key={elem.id} > {elem.name}</div>;
        });
    
    return (
    <div className='category'>
        <div className='category-header'> Tasks </div>
        <div className='today'> Today </div>
        <div className='categories-list'>
            {newArr}
        </div>
    </div>
    )
}


export default Categories;