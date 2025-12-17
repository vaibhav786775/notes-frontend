import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams()
  const pastes = useSelector((state) => state.paste?.pastes)

  const paste = (pastes && pastes.find((p) => p._id === id)) || {}

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center py-10 px-4 sm:px-6">
      <div className="w-full max-w-6xl space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-neutral-100">
            {paste.title || 'Untitled Paste'}
          </h1>
          <p className="text-neutral-400 text-sm">
            Created on {paste.createdAt ? new Date(paste.createdAt).toLocaleDateString() : 'Unknown date'}
          </p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-neutral-300">
                Content
              </label>
              <button
                onClick={() => {
                  if (paste.content) {
                    navigator.clipboard.writeText(paste.content);
                    toast.success('Copied to clipboard');
                  }
                }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                disabled={!paste.content}
              >
                Copy content
              </button>
            </div>

            <div className="relative group">
              <textarea
                disabled
                value={paste.content || ''}
                className="w-full min-h-[500px] p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-sm leading-relaxed resize-none opacity-90 focus:outline-none cursor-default"
                rows={20}
              ></textarea>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/20 pointer-events-none rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ViewPaste