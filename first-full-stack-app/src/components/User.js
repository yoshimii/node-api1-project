import React from 'react';
import { Link } from 'react-router-dom';

const User = (props) => {
console.log(props)

    return (
        <>
        <div>
        <h1>{props.name}</h1>
        <p>{props.bio}</p>
        <button >Edit</button>
        </div>
        </>
    )
}

export default User;