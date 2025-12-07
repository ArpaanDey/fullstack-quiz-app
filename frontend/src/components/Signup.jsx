import React, { useState } from "react";
import { loginStyles, signupStyles } from "../assets/dummyStyles.js";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Eye, EyeOff, Mail, User } from "lucide-react";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function Signup({ onSignupSuccess = null }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    return e;
  };

  const API_BASE = "https://fullstack-quiz-app-wine.vercel.app";

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError("");

    const v = validate();
    setErrors(v);

    if (Object.keys(v).length) return;

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      };

      const resp = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      let data = null;

      try {
        data = await resp.json();
      } catch (e) {
        //ignore all error
      }

      if (!resp.ok) {
        const msg = data?.message || "register failed";
        setSubmitError(msg);
        return;
      }

      if (data?.token) {
        try {
          localStorage.setItem("authToken", data.token);

          localStorage.setItem(
            "currentUser",
            JSON.stringify(
              data.user || {
                name: name.trim(),
                email: email.trim().toLowerCase(),
              }
            )
          );
          //   navigate("/");
        } catch (err) {
          // ignore all the errors
        }
      }

      if (typeof onSignupSuccess === "function") {
        try {
          onSignupSuccess(
            data.user || {
              name: name.trim(),
              email: email.trim().toLowerCase(),
            }
          );
        } catch (err) {
          //   console.error("Signup success callback error:", err);
        }
      }
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Signup error:", err);
      setSubmitError("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={signupStyles.pageContainer}>
      <Link to="/" className={signupStyles.backButton}>
        <ArrowLeft className={signupStyles.backButtonIcon} />
        <span className={signupStyles.backButtonText}>back</span>
      </Link>

      <div className={signupStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={signupStyles.animatedBorder}>
            <div className={signupStyles.formContent}>
              {/* ---- Heading ---- */}
              <h2 className={signupStyles.heading}>
                <span className={signupStyles.headingIcon}>
                  <CheckCircle className={signupStyles.headingIconInner} />
                </span>

                <span className={signupStyles.headingText}>Create Account</span>
              </h2>

              <label className={signupStyles.label}>
                <span className={signupStyles.labelText}>Full Name</span>

                <div className={signupStyles.inputContainer}>
                  <span className={signupStyles.inputIcon}>
                    <User className={signupStyles.inputIconInner} />
                  </span>

                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      // Clear error if user starts typing
                      setErrors((prev) => ({
                        ...prev,
                        name: undefined,
                      }));
                    }}
                    className={`${signupStyles.input} ${
                      errors.name
                        ? signupStyles.inputError
                        : signupStyles.inputNormal
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {errors.name && (
                  <p className={signupStyles.errorText}>{errors.name}</p>
                )}
              </label>

              <label className={signupStyles.label}>
                <span className={signupStyles.labelText}>Email</span>

                <div className={signupStyles.inputContainer}>
                  <span className={signupStyles.inputIcon}>
                    <Mail className={signupStyles.inputIconInner} />
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);

                      // Clear error if user starts typing
                      setErrors((prev) => ({
                        ...prev,
                        email: undefined,
                      }));
                    }}
                    className={`${signupStyles.input} ${
                      errors.email
                        ? signupStyles.inputError
                        : signupStyles.inputNormal
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {errors.email && (
                  <p className={signupStyles.errorText}>{errors.email}</p>
                )}
              </label>

              <label className={signupStyles.label}>
                <span className={signupStyles.labelText}>password</span>

                <div className={signupStyles.inputContainer}>
                  <span className={signupStyles.inputIcon}>
                    <Mail className={signupStyles.inputIconInner} />
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);

                      // Clear error if user starts typing
                      setErrors((prev) => ({
                        ...prev,
                        password: undefined,
                      }));
                    }}
                    className={`${signupStyles.input} ${
                      signupStyles.passwordInput
                    }${
                      errors.password
                        ? signupStyles.inputError
                        : signupStyles.inputNormal
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className={signupStyles.passwordToggle}
                  >
                    {showPassword ? (
                      <EyeOff className={signupStyles.passwordToggleIcon} />
                    ) : (
                      <Eye className={signupStyles.passwordToggleIcon} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className={signupStyles.errorText}>{errors.password}</p>
                )}
              </label>

              {submitError && (
                <p className={signupStyles.submitError}>{submitError}</p>
              )}

              <div className={signupStyles.buttonsContainer}>
                <button
                  type="submit"
                  disabled={loading}
                  className={signupStyles.submitButton}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className={signupStyles.loginPromptContainer}>
          <div className={signupStyles.loginPromptContent}>
            <span className={signupStyles.loginPromptText}>
              Already have an account?
            </span>

            <Link to="/login" className={signupStyles.loginPromptLink}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
