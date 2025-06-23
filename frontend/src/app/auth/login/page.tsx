"use client";
import { axiosInstance } from "@/app/lib/axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export default function Login() {
  const [details, setDetails] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validateForm = () => {
    const { error } = loginSchema.validate(details, { abortEarly: false });
    if (!error) return null;

    const validationErrors: Partial<LoginForm> = {};
    error.details.forEach((err) => {
      if (err.path[0])
        validationErrors[err.path[0] as keyof LoginForm] = err.message;
    });
    return validationErrors;
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({}); // Clear previous errors
    axiosInstance
      .post("/user/login", details)
      .then((val) => {
        localStorage.setItem("Auth-Token", val.data.token);
        router.replace("/content/connect");
      })
      .catch((error) => {
        const response = error.response.data;
        const message: string = response.message;
        if (/password/i.test(message)) {
          setErrors((prev) => ({
            ...prev,
            password: message.replaceAll('"', ""),
          }));
        } else if (/email/i.test(message)) {
          setErrors((prev) => ({
            ...prev,
            email: message.replaceAll('"', ""),
          }));
        } else {
          alert(message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
    setErrors((prev) => ({ ...prev, [ev.target.name]: undefined })); // Clear field-specific error
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 transition-all">
        <h2 className="text-3xl font-extrabold text-center text-gray-600 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Sign into your account
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={details.email}
              onChange={handleChange}
              placeholder="Email"
              className={`mt-1 w-full px-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              required
            />
            {errors.email && (
              <p className="text-xs mt-2 capitalize text-red-600">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={details.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`mt-1 w-full px-4 py-3 rounded-xl border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              required
            />
            {errors.password && (
              <p className="text-xs mt-2 capitalize text-red-600">
                {errors.password}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-base hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl transition focus:outline-none focus:ring-4 focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Create one
          </a>
        </div>
      </div>
    </section>
  );
}
