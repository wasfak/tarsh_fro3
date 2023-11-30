import SearchResultTable from "@/components/SearchResultTable";
import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    setIsSearching(true);
    e.preventDefault();

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const result = await response.json();

        setResult(result);

        if (onSearch) {
          onSearch(result);
        }
      } else {
        console.error("Error searching for code:", response.statusText);
      }
    } catch (error) {
      console.error("Error searching for code:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex p-2 min-h-screen">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="mb-8">
          <label className="block mb-2 text-lg font-semibold">
            Enter Code:
          </label>
          <div className="flex mb-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-2 border rounded-md flex-grow mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {result && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Search Result:</h3>
            <SearchResultTable searchResult={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
