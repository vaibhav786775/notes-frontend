import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) =>
  state.paste.pastes);
  const [searchterm ,setSearchterm ] = useState('');

  const dispatch = useDispatch();
  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchterm.toLowerCase())
  );
  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId))
  }
  const handleShare = async (pasteId) => {
    const url = `${window.location.origin}/?pasteId=${pasteId}`;

    if (navigator.share) {
      await navigator.share({
        title: "Shared Paste",
        text: "Check this paste",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <input
          className="flex-1 h-14 px-5 border-2 border-gray-300 rounded-full bg-white text-gray-900 placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
          type="search"
          placeholder="Search pastes"
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <article key={paste._id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {paste.title}
                </h3>

                <p className="text-gray-700 text-base leading-relaxed mb-5 line-clamp-4">{paste.content}</p>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <NavLink to={`/?pasteId=${paste?._id}`} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition">
                      Edit
                    </NavLink>
                    <NavLink to={`/pastes/${paste?._id}`} className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition">
                      View
                    </NavLink>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDelete(paste?._id)} className="px-4 py-2 rounded-lg text-sm font-semibold text-red-700 bg-red-100 hover:bg-red-200 transition">
                      Delete
                    </button>
                    <button onClick={() => {navigator.clipboard.writeText(paste?.content); toast.success('Copied successfully')}} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
                      Copy
                    </button>
                    <button onClick={() => handleShare(paste?._id)} className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
                      Share
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">{new Date(paste.createdAt).toLocaleString()}</div>
              </article>
            )
          })}
      </div>
    </main>
  )
}

export default Paste