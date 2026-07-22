import useAuthStore from "../store/useAuthStore";

const Login = () => {

    const { googleSignin } = useAuthStore();

    const handleGoogleSignIn = () => {
        googleSignin();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-100 px-4">
            <div className="w-full max-w-md">
                {/* Logo / Brand */}
                <div className="mb-8 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
                        <span className="text-2xl font-bold text-white">FC</span>
                    </div>

                    <h1 className="text-4xl font-bold text-slate-900">
                        Form Circuit
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Create, share and manage forms effortlessly.
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
                    <h2 className="mb-2 text-center text-2xl font-bold text-slate-900">
                        Welcome Back 👋
                    </h2>

                    <p className="mb-8 text-center text-slate-500">
                        Sign in with Google to continue
                    </p>

                    <button
                        onClick={handleGoogleSignIn}
                        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-3 font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                            alt="Google"
                            className="h-5 w-5"
                        />

                        <span>Continue with Google</span>
                    </button>

                    <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                        Don't have an account? No problem. Signing in with Google
                        automatically creates one for you.
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-slate-500">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default Login;