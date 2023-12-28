import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <nav className="w-full flex justify-end border-b border-b-foreground/10 h-16 mb-5 px-4">
      <div className="max-w-4xl p-3 text-sm">{<AuthButton />}</div>
    </nav>
  );
}
