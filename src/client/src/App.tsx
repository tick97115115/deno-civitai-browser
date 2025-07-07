function SearchBar() {
  return (
    <div className="join">
      <div>
        <label className="input join-item">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="text"
            placeholder="enter the keyword for search"
          />
        </label>
      </div>
      <button type="button" className="btn btn-neutral join-item">
        Search
      </button>
    </div>
  );
}

function SearchOptions() {
  return (
    <div className="dropdown dropdown-top dropdown-center">
      <div tabIndex={0} role="button" className="btn m-1">
        Options
      </div>
      <div
        tabIndex={0}
        className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md"
      >
        <div className="card-body">
          <p>This is a card. You can use any element as a dropdown.</p>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <div className="h-full overflow-auto">
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>
      <div>content</div>

      {/* padding content prevent search bar cover last content */}
      <div className="h-1/6"></div>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative h-dvh">
      <Gallery></Gallery>
      <div className="absolute bottom-0 w-full">
        <div className="flex justify-center items-center">
          <SearchOptions></SearchOptions>
          <SearchBar></SearchBar>
        </div>
      </div>
    </div>
  );
}
