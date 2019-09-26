import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Message from '../components/message';

const Signup = (props) => {

    const [ user, setUser ] = useState({ username: '', password: '' });
    const [ isMessage, setIsMessage ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ userLoggedIn, setUserLoggedIn ] = useState(null);

    const signup = e => {
        e.preventDefault();
        if(user.username === '' || user.password === '') {
            setMessage("You must fill all the fields");
            setIsMessage(true);
            return;
        }
        axios.post('http://localhost:5000/api/signup', user, {withCredentials: true})
            .then(user => {
                setUserLoggedIn(user.data);
                props.history.push('/login')
            })
            .catch(err => console.log(err))
    }

    return(
        <section className='container'>
            <form onSubmit={signup}>
                <h2>Signup</h2>
                <div>
                    <label>Username</label>
                    <input name='username' onChange={e => setUser({...user, [e.target.name]: e.target.value})} type="text" placeholder='Username' />
                </div>
                <div>
                    <label>Password</label>
                    <input name='password' onChange={e => setUser({...user, [e.target.name]: e.target.value})} type="password" placeholder='Password' />
                </div>
                {isMessage && <Message message={message} />}
                <input type="submit" value="Signup"/>
            </form>
        </section>
    )
}

export default withRouter(Signup);