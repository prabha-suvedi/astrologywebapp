export default function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
      >
        {children}
      </button>
    );
  }
  