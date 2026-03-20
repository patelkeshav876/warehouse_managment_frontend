
const TopBar = ({ title }) => (
  <header className="w-full h-16 flex items-center px-8 bg-blue border-b border-gray-200 justify-between">
    <input
      type="text"
      placeholder={`Search in ${title}...`}
      className="px-4 py-2 w-96 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-200 transition"
    />
    <div className="flex items-center gap-4">
      {/* Profile, notification, add icon buttons */}
      <button className="bg-blue-100 text-blue-700 px-5 py-2 rounded-md font-semibold">+ New</button>
      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold">B</span>
    </div>
  </header>
);

export default TopBar;