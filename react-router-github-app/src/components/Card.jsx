function Card({ username, btnText = "Visit Profile" }) {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{username}</div>
        <p className="text-gray-300 text-base">
          Software Developer and React Enthusiast.
        </p>
      </div>
      <div className="px-6 pt-4 pb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {btnText}
        </button>
      </div>
    </div>
  );
}

export default Card;