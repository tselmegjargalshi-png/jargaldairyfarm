import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <h1 className="text-3xl text-green-900">Админ нэвтрэх</h1>
      <p className="mb-6 mt-2 text-sm text-muted">Ц. Жаргал | Сүүний аж ахуй — сайтын удирдлага</p>
      <LoginForm />
    </div>
  );
}
