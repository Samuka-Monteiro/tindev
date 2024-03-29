import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import isAmatch from '../assets/itsamatch.png'
import dislike from '../assets/dislike.svg'
import api from '../services/api'
import './main.css'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

export default function Main({ match }) {
    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { user: match.params.id }
            })

            setUsers(response.data)
        }

        loadUsers()
    }, [match.params.id])

    useEffect(() => {
        const socket = io('http://localhost:3000', {
            query: { user: match.params.id }
        })

        socket.on('match', dev => {
            setMatchDev(dev)
        })
    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            {
                users.length > 0 ? (
                    <ul>
                        {users.map((user, key) => (
                            <li key={key}>
                                <img src={user.avatar} alt={user.name} />
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p>{user.bio}</p>
                                </footer>
                                <div className="buttons">
                                    <button className="btn" onClick={() => handleDislike(user._id)}>
                                        <img src={dislike} alt="dislike" />
                                    </button>
                                    <button className="btn" onClick={() => handleLike(user._id)}>
                                        <img src={like} alt="like" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                        <h6 className="empty">No more users :( </h6>
                    )
            }
            {matchDev && (
                <div className="match-container">
                    <img src={isAmatch} alt="is a match" />
                    <img className="avatar" src={matchDev.avatar} alt="avatar" />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button className="btn" onClick={() => setMatchDev(null)}>Close</button>
                </div>
            )}
        </div>
    );
}
