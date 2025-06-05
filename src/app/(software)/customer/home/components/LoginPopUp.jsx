'use client';

import React, { useState, useEffect } from "react";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const images = [
  { id: 1, label: "/bgimg1.jpeg", img: "/bgimg1.jpeg" },
  { id: 2, label: "/bgimg2.jpeg", img: "/bgimg2.jpeg" },
  { id: 3, label: "/bgimg3.webp", img: "/bgimg3.webp" },
];

export default function LoginPopUp({ onOpen }) {
  const { Login } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const [emailorusername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToImage = (index) => {
    setCurrentImage(index);
  };
  
  console.log(emailorusername);

  const handleLogin = async () => {
    try {
      // Customer Login section
      const CustomerLogin = await Login(emailorusername, password, "Customer");
      if (CustomerLogin) {
        console.log(CustomerLogin);
        switch (CustomerLogin.record.role) {
          case "Customer":
              alert('Login Successfull Redirecting to Customer Dashboard');
              router.push('/customer/dashboard');
            break;

          case "Client":
              alert('Login Successfull');
              router.push('/client/dashboard Redirecting to Client Dashboard');
            break;
        
          default:
              console.log(CustomerLogin);
            break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-6">
        <div className="bg-white shadow-2xl rounded-xl w-full max-w-4xl mx-auto flex flex-col md:flex-row max-h-screen overflow-y-auto">
          <div className="md:w-1/2 w-full p-8 flex flex-col justify-center relative bg-[var(--accent)]">
            {activeTab === "personal" ? (
              <div className="text-center">
                <Image src={"/bgimg3.webp"} alt="Images" fill />
              </div>
            ) : (
              <div className="text-center">
                <div className="w-full h-48 bg-white/30 rounded-lg flex items-center justify-center mb-4 text-2xl font-semibold text-[#2E6F40]">
                  {/* {images[currentImage].img} */}
                  <Image src={"/bgimg4.webp"} alt="Images" fill />
                </div>
              </div>
            )}
          </div>

          <div className="md:w-1/2 w-full p-8 bg-white relative">
            <button
              onClick={onOpen}
              className="absolute top-2 right-2 p-2 hover:bg-gray-300 bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="flex mt-6 mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("personal")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "personal"
                    ? "bg-[var(--primary)] text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                PERSONAL ACCOUNT
              </button>
              <button
                onClick={() => setActiveTab("merchant")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "merchant"
                    ? "bg-[var(--primary)] text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                CLIENT LOGIN
              </button>
            </div>

            {activeTab === "personal" && (
              <div>
                <div className="text-center mb-6">
                  <h2
                    className="text-2xl font-semibold mt-2"
                    style={{ color: "#2E6F40" }}
                  >
                    Welcome to Gol Logistics
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Login to Your Account
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      value={emailorusername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      style={{ backgroundColor: "#f8fffe" }}
                    />
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type={showPassword ? "password" : "text"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*********"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      style={{ backgroundColor: "#f8fffe" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="remember" className="text-gray-600">
                        Remember Me
                      </label>
                    </div>
                    <a href="#" className="text-red-500 hover:underline">
                      Forget Password?
                    </a>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full py-3 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: "#2E6F40" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#1a4025")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#2E6F40")
                    }
                  >
                    Login
                  </button>
                </div>

                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-gray-500 text-sm">or</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <button className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <FcGoogle />
                  Login With Google Account
                </button>

                <p className="text-center text-sm mt-4 text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-semibold hover:underline"
                    style={{ color: "#2E6F40" }}
                  >
                    Sign Up
                  </a>
                </p>

                <p className="text-center text-xs text-gray-500 mt-2">
                  Need Help?{" "}
                  <a
                    href="mailto:support@gollogistics.com"
                    className="hover:underline"
                    style={{ color: "#2E6F40" }}
                  >
                    support@gollogistics.com
                  </a>
                </p>
              </div>
            )}

            {activeTab === "client" && (
              <div>
                <div className="text-center mb-6">
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: "#2E6F40" }}
                  >
                    Login/Sign up
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Work Email
                      <span className="float-right text-red-500 text-xs cursor-pointer">
                        Forgot Login Id?
                      </span>
                    </label>
                    <input
                      type="email"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="Enter your work email id"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type={showPassword ? "password" : "text"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*********"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      style={{ backgroundColor: "#f8fffe" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: "#2E6F40" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#1a4025")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#2E6F40")
                    }
                  >
                    CONTINUE
                  </button>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    OR USE YOUR BUSINESS ACCOUNT WITH
                  </div>

                  <button className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                    <FcGoogle />
                    Login With Google Account
                  </button>

                  <p className="text-center text-sm mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <a
                      href="#"
                      className="font-semibold hover:underline"
                      style={{ color: "#2E6F40" }}
                    >
                      Sign Up
                    </a>
                  </p>

                  <p className="text-center text-xs text-gray-500 mt-2">
                    Need Help?{" "}
                    <a
                      href="mailto:support@gollogistics.com"
                      className="hover:underline"
                      style={{ color: "#2E6F40" }}
                    >
                      support@gollogistics.com
                    </a>
                  </p>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By proceeding, you agree to Gol Logistics's{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms of use
                    </a>
                    ,{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms of services
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Privacy
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
