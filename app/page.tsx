import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <LoginForm />
    </div>
  );
}
