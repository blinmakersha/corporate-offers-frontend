import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'user' && password === 'pass') {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = '/';
        } else {
            alert('Неверное имя пользователя или пароль');
        }
    };

    return (
        <div className="auth-page">
            <h1>Авторизация</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;