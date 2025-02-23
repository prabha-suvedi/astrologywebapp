export function Card({ children }) {
    return (
      <div className="bg-white text-black p-4 rounded-lg shadow-lg">
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }
  