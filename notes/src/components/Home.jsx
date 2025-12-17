import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const allpastes = useSelector((state) => state.paste.pastes)
  const pasteId = searchParams.get("pasteId")
  useEffect(() => {
    console.log("inside use effect")
    if (pasteId) {
      const paste = allpastes.find((p) =>
        p._id === pasteId
      )
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])

  function createpaste() {
    if (!title.trim() || !value.trim()) {
      toast.error('Title and content cannot be empty');
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      // update
      dispatch(updateToPastes(paste))
      toast.success('Paste updated successfully');
    } else {
      // create
      dispatch(addToPastes(paste))
      toast.success('Paste created successfully');
    }

    setTitle('');
    setValue('');
    setSearchParams('');
  }

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-6xl space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {pasteId ? 'Edit Paste' : 'Create Paste'}
          </h1>
          <p className="text-neutral-400">
            Share your clean code snippets and text notes instantly.
          </p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-neutral-300">
                Title
              </label>
              <input
                id="title"
                className="w-full h-12 px-4 rounded-lg bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                type="text"
                placeholder="Ex: Authentication Middleware"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-neutral-300">
                Content
              </label>
              <textarea
                id="content"
                value={value}
                className="w-full min-h-125 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 font-mono text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                placeholder="// Write your code here..."
                onChange={(e) => {
                  setValue(e.target.value)
                }}
              ></textarea>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={createpaste}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {pasteId ? 'Update Paste' : 'Create Paste'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
