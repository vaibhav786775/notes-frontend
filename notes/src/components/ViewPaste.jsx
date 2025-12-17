import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ViewPaste = () => {
  const { id } = useParams()
  const pastes = useSelector((state) => state.paste?.pastes)

  const paste = (pastes && pastes.find((p) => p._id === id)) || {}

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-6">
        <input
          disabled
          className="flex-1 h-14 px-4 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400"
          type='text'
          placeholder='enter title here'
          value={paste.title || ''}
        />
      </div>

      <div>
        <textarea
          disabled
          value={paste.content || ''}
          className="w-full min-h-96 mt-6 p-5 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-500 text-base leading-relaxed font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder='enter content here '
          rows={20}
        ></textarea>
      </div>
    </div>
  )
}

export default ViewPaste