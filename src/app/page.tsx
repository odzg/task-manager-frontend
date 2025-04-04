import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-3xl font-bold">Welcome to the Task Manager</h1>
      <p className="mb-6">
        Manage your tasks more efficiently with role-based access and more.
      </p>
      <Link
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        href="/login"
      >
        Go to Login
      </Link>
    </main>
  );
}
