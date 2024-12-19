import React from "react";
import { useFormik } from "formik";
import "./LoginPage.css";

const LoginPage = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: values => {
            const errors = {};
            if (!values.username.trim()) {
                errors.username = 'Имя пользователя не может быть пустым.';
            } else if (values.username.length < 3) {
                errors.username = 'Имя пользователя должно содержать не менее 3 символов';
            }

            if (!values.password.trim()) {
                errors.password = 'Пароль не может быть пустым.';
            } else if (values.password.length < 6) {
                errors.password = 'Пароль должен содержать не менее 6 символов';
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                const response = await fetch('/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('isAuthenticated', 'true');
                    window.location.href = '/';
                } else {
                    const errorData = await response.json();
                    formik.setErrors({ server: errorData.message || 'Неверное имя пользователя или пароль' });
                }
            } catch (error) {
                console.error('Ошибка авторизации:', error);
                formik.setErrors({ server: 'Произошла ошибка, попробуйте позже.' });
            }
        },
    });

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login';
    };

    return (
        <div className="auth-page">
            <h1>Авторизация</h1>
            <form onSubmit={formik.handleSubmit} className="auth-form">
                <div>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        {...formik.getFieldProps('username')}
                        required
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <p className="error-message">{formik.errors.username}</p>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps('password')}
                        required
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <p className="error-message">{formik.errors.password}</p>
                    ) : null}
                </div>
                <button type="submit">Войти</button>
                {formik.errors.server && <p className="error-message">{formik.errors.server}</p>}
            </form>
            {localStorage.getItem('isAuthenticated') && (
                <button onClick={handleLogout}>Выйти</button>
            )}
        </div>
    );
};

export default LoginPage;