import HeroIcon from "./HeroIcon";

function SearchBar() {
  return (
    <div className="relative h-20 items-center flex">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <HeroIcon icon="SearchIcon" className="text-gray-500" />
      </div>
      <input
        type="search"
        className="w-full p-4 h-10 ps-10 text-gray-500 border border-gray-200 rounded-2xl focus:border-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        placeholder="Search Stations, Artists, Tags..."
        required
      />
      <button className="gradient-bg ml-3 py-2 px-4 rounded-2xl text-white">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
