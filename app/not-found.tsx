export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center px-4">

      <h1 className="text-7xl font-bold text-[var(--primary)]">
        404
      </h1>

      <p className="mt-4 text-lg text-[var(--muted-foreground)]">
        This page doesn’t exist or has been moved.
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition"
      >
        Back to Home
      </a>

    </div>
  );
}