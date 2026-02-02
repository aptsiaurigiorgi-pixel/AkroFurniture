import { useState } from "react";
import { motion } from "motion/react";
import { useShopping } from "../contexts/ShoppingContext.jsx";
import { useTranslation } from "react-i18next";

function LoginPage({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useShopping();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
    }

    if (login(email, password)) {
      onClose();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="login-header">
          <h2>{isSignUp ? t("login.signUp") : t("login.signIn")}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="form-group"
            >
              <label htmlFor="name">{t("signup.name")}</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </motion.div>
          )}

          <div className="form-group">
            <label htmlFor="email">{t("login.email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("login.password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="form-group"
            >
              <label htmlFor="confirmPassword">
                {t("signup.confirmPassword")}
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSignUp ? t("signup.signUp") : t("login.signIn")}
          </motion.button>

          <div className="login-footer">
            <p>
              {isSignUp ? t("signup.haveAccount") : t("login.noAccount")}{" "}
              <button
                type="button"
                className="switch-form-button"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? t("signup.signIn") : t("login.signUp")}
              </button>
            </p>
            {!isSignUp && (
              <a href="#forgot-password" className="forgot-password">
                Forgot password?
              </a>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginPage;
