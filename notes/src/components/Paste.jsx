import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) =>
    state.paste.pastes);
  const [searchterm, setSearchterm] = useState('');

  const dispatch = useDispatch();
  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchterm.toLowerCase())
  );
  function handleDelete(pasteId) {
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
    <main className="min-h-screen bg-neutral-950 py-10 px-4 sm:px-6">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            All Pastes
          </h1>
          <div className="w-full sm:w-auto min-w-[300px]">
            <input
              className="w-full h-10 px-4 rounded-lg bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
              type="search"
              placeholder="Search pastes by title..."
              value={searchterm}
              onChange={(e) => setSearchterm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => {
              return (
                <div key={paste._id} className="group bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900 hover:border-neutral-700 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="text-xl font-semibold text-neutral-100 truncate group-hover:text-blue-400 transition-colors">
                          {paste.title}
                        </h3>
                        <p className="text-neutral-500 text-xs font-medium">
                          {new Date(paste.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          {' • '}
                          {new Date(paste.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <NavLink to={`/?pasteId=${paste?._id}`} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 bg-blue-950/50 border border-blue-900/50 hover:bg-blue-900/50 transition-colors">
                          Edit
                        </NavLink>
                        <NavLink to={`/pastes/${paste?._id}`} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors">
                          View
                        </NavLink>
                        <button onClick={() => { navigator.clipboard.writeText(paste?.content); toast.success('Copied!') }} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors">
                          Copy
                        </button>
                        <button onClick={() => handleShare(paste?._id)} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors">
                          Share
                        </button>
                        <button onClick={() => { handleDelete(paste?._id); toast.success('Deleted') }} className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 bg-red-950/30 border border-red-900/30 hover:bg-red-900/50 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="bg-neutral-950/50 rounded-lg p-4 border border-neutral-800/50">
                      <p className="text-neutral-400 text-sm font-mono line-clamp-3 leading-relaxed">
                        {paste.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-neutral-900/30 rounded-xl border border-dashed border-neutral-800">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-neutral-300 mb-2">No pastes found</h3>
              <p className="text-neutral-500">Create a new paste to get started!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Paste
