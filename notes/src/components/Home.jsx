import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';



const Home = () => {
  const dispatch = useDispatch();
  const [title , setTitle] = useState('');
  const [value , setValue] = useState('');
  const [searchParams , setSearchParams] = useSearchParams();
  const allpastes = useSelector((state) =>state.paste.pastes)
  const pasteId = searchParams.get("pasteId")
  useEffect(() =>{
    console.log("inside use effect")
        if(pasteId){
          const paste = allpastes.find((p) =>
            p._id === pasteId
          )
          setTitle(paste.title);
          setValue(paste.content);
        }
      },[pasteId])
  
  function createpaste(){
    if(!title.trim() || !value.trim()){
      toast.error('Title and content cannot be empty');
      return;
    }

    const paste ={
      title: title,
      content: value,
      _id: pasteId ||  Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

   

    if(pasteId){
      // update

      dispatch(updateToPastes(paste))
      toast.success('Paste updated successfully');

    }else{
      // create
      dispatch(addToPastes(paste))
      toast.success('Paste created successfully');
    }

    setTitle('');
    setValue('');
    setSearchParams('');
  }
  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-4">
          <input
            className="flex-1 w-full h-14 px-4 border-2 border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createpaste}
            className="mt-2 md:mt-0 h-14 inline-flex items-center gap-2 bg-emerald-600 text-white px-8 rounded-xl text-base font-semibold shadow-md hover:bg-emerald-700 transition-colors"
          >
            {pasteId ? 'Update Paste' : 'Create Paste'}
          </button>
        </div>

        <div>
          <textarea
            value={value}
            className="w-full min-h-96 p-5 border-2 border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 text-base leading-relaxed font-mono resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all"
            placeholder="Enter content here"
            onChange={(e) => {
              setValue(e.target.value)
            }}
            rows={20}
          ></textarea>
        </div>
      </div>
    </main>
  )
}

export default Home