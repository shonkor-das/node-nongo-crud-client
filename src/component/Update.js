import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storeUser = useLoaderData();
    const [user, setUser] = useState({});
    
    const handleUpdateUser = event =>{
        event.preventDefault();
        // console.log(user);
        fetch(`http://localhost:5000/users/${storeUser._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('User Updated');
                console.log(data);
                event.target.reset();
            }
        })
    }

    const handleInputeChange = event =>{
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user}
        newUser[field] = value;
        setUser(newUser);
        
        }

    return (
        <div>
            <h2>Please Update: {storeUser.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input onBlur={handleInputeChange} defaultValue={storeUser.name} type="text" name="name" placeholder='name'/>
                <br/>
                <input onBlur={handleInputeChange} defaultValue={storeUser.email} type="email" name="email" placeholder='email'/>
                <br/>
                <input onBlur={handleInputeChange} defaultValue={storeUser.address} type="text" name="address" placeholder='address'/>
                <br/>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Update;