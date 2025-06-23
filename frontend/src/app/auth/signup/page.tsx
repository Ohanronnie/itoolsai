"use client";

import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";
import Joi from "joi";
import { AxiosError } from "axios";
import { axiosInstance } from "@/app/lib/axios";
import { useRouter } from "next/navigation";

type SignupForm = {
  email: string;
  password: string;
  termsAccepted: boolean;
};

const signupSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  termsAccepted: Joi.boolean().valid(true).required().messages({
    "any.only": "You must accept the Terms & Conditions",
  }),
});

export default function Signup() {
  const [details, setDetails] = useState<SignupForm>({
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Partial<SignupForm>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validateForm = () => {
    const { error } = signupSchema.validate(details, { abortEarly: false });
    if (!error) return null;

    const validationErrors: any = {};
    error.details.forEach((err) => {
      if (err.path[0])
        validationErrors[err.path[0] as keyof SignupForm] = err.message;
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
      .post("/user/create", {
        email: details.email,
        password: details.password,
      })
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error: any) => {
        let response = error?.response?.data?.message
          ?.toLowerCase()
          ?.replaceAll('"', "");
        response = response.replace(response[0], response[0].toUpperCase());

        if (response.includes("Email")) {
          setErrors((prev) => ({ ...prev, email: response }));
        } else {
          setErrors((prev) => ({ ...prev, email: null }) as any);
        }

        if (response.includes("Password")) {
          setErrors((prev) => ({ ...prev, password: response }));
        } else {
          setErrors((prev) => ({ ...prev, password: null }) as any);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = ev.target;
    setDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // Clear field-specific error
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 transition-all">
        <h2 className="text-3xl font-bold text-center text-gray-600 mb-2">
          Create an account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Join us and start your journey
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
              id="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`mt-1 w-full px-4 py-3 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              required
            />
            {errors.email && (
              <p className="text-xs mt-2 text-red-600">{errors.email}</p>
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
              placeholder="Enter your password"
              className={`mt-1 w-full px-4 py-3 rounded-xl border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
              required
            />
            {errors.password && (
              <p className="text-xs mt-2 text-red-600">{errors.password}</p>
            )}
          </div>
          <div className="flex items-start text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={details.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <span className="text-gray-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Terms & Conditions
                </a>
              </span>
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-xs mt-2 text-red-600">{errors.termsAccepted}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl transition focus:outline-none focus:ring-4 focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
