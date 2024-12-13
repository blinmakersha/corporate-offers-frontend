import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        if (username.trim() === '' || password.trim() === '') {
            setMessage('Имя пользователя или пароль не может быть пустым.');
        }

        if (username.length() < 3) {
            setMessage('Имя пользователя должно содержать не менее 3 символов');
        }

        if (password.length() < 6) {
            setMessage('Пароль должен содержать не менее 6 символов');
        }
        
        try {
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('isAuthenticated', 'true');
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Неверное имя пользователя или пароль');
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            setMessage('Произошла ошибка, попробуйте позже.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login';
    };

    // const oldHandleLogin = (e) => {
    //     e.preventDefault();
    //     if (username === 'user' && password === 'pass') {
    //         localStorage.setItem('isAuthenticated', 'true');
    //         window.location.href = '/';
    //     } else {
    //         alert('Неверное имя пользователя или пароль');
    //     }
    // };

    return (
        <div className="auth-page">
            <h1>Авторизация</h1>
            <form onSubmit={handleLogin} className="auth-form">
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
                {message && <p className="error-message">{message}</p>}
            </form>
            {localStorage.getItem('isAuthenticated') && (
                <button onClick={handleLogout}>Выйти</button>
            )}
        </div>
    );
};

export default LoginPage;