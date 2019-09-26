import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Message from '../components/message';

const Login = (props) => {

    const { getUser } = props;

    const [ user, setUser ] = useState({ username: '', password: '' });
    const [ isMessage, setIsMessage ] = useState(false);
    const [ message, setMessage ] = useState('hola');


    const login = e => {
        e.preventDefault();

        if(user.username === '' || user.password === '') {
            setMessage("You must fill all the fields");
            setIsMessage(true);
            return;
        }

        axios.post('http://localhost:5000/api/login', user, { withCredentials: true })
            .then(user => {
                if(user.data.message === "sorry, we coun't find that account") {
                    setMessage("sorry, we coun't find that account");
                    setIsMessage(true);
                    return;
                }
                getUser({username: user.data.username, id: user.data._id});
                props.history.push('/tasks')
            }).catch(err => {
                console.log(err)
            });
    }

    return(
        <section className='container'>
            <form onSubmit={login}>
                <h2>Login</h2>
                <div>
                    <label>Username</label>
                    <input
                        name='username'
                        onChange={e => {
                                setUser({...user, [e.target.name]: e.target.value});
                                setIsMessage(false);
                            }
                        }
                        type="text"
                        placeholder='Username' />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        name='password'
                        onChange={e => {
                                setUser({...user, [e.target.name]: e.target.value})
                                setIsMessage(false)
                            }
                        }
                        type="password"
                        placeholder='Password' />
                </div>
                {isMessage && <Message message={message} />}
                <input type="submit" value="Login"/>
            </form>
        </section>
    )
}

export default withRouter(Login);