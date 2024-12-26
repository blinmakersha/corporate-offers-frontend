import React from "react";
import { api } from "../../core/services/api";
import { useFormik } from "formik";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/UserProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email не может быть пустым.";
      } else if (values.email.length < 3) {
        errors.email = "Email должно содержать не менее 3 символов";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Неверный формат email";
      }

      if (!values.password) {
        errors.password = "Пароль не может быть пустым.";
      } else if (values.password.length < 3) {
        errors.password = "Пароль должен содержать не менее 3 символов";
      }

      return errors;
    },
    onSubmit: async (values) => {
      api.ApiLogin.loginUser(values)
        .then((result) => {
          localStorage.setItem("AccessToken", result.accessToken);
          localStorage.setItem("user", JSON.stringify(result))
          setUser({ ...result, token: result.accessToken });
          navigate("/");
        })
        .catch(() => {
          formik.setErrors({ server: "Неверное Email или пароль" });
        });
    },
  });

  return (
    <div className="login-page">
      <h1 className="login-page__title">Авторизация</h1>
      <form onSubmit={formik.handleSubmit} className="login-page__form">
        <div className="login-page__input-group">
          <label htmlFor="email" className="login-page__label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            {...formik.getFieldProps("email")}
            required
            className="login-page__input"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="login-page__error-message">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="login-page__input-group">
          <label htmlFor="password" className="login-page__label">
            Пароль:
          </label>
          <input
            type="password"
            id="password"
            {...formik.getFieldProps("password")}
            required
            className="login-page__input"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="login-page__error-message">
              {formik.errors.password}
            </p>
          ) : null}
        </div>
        <button type="submit" className="login-page__button">
          Войти
        </button>
        {formik.errors.server && (
          <p className="login-page__error-message">{formik.errors.server}</p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
