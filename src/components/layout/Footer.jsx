export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 pb-10">
      <div className="mt-12 pt-8 border-t border-neutral-200">
        <p className="text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Recipe Builder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
