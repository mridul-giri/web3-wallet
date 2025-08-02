export default function Navbar() {
  return (
    <div
      className="flex justify-between items-center gap-40 border py-3 px-6 
    rounded-xl my-5 bg-blue-100 text-gray-800"
    >
      <span className="cursor-pointer hover:underline text-xl">
        Solana
      </span>
      <span className="cursor-pointer hover:underline text-xl">
        Etherum
      </span>
    </div>
  );
}
