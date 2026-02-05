import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, deleteProduct } from './crudThunks';
import { clearResult } from './crudSlice';
import type { RootState, AppDispatch } from '../../store/store';

export default function CrudDemo() {
  const dispatch = useDispatch<AppDispatch>();
  const { result, status } = useSelector((state: RootState) => state.crud);

  const [postTitle, setPostTitle] = useState('');
  const [putId, setPutId] = useState('');
  const [putJson, setPutJson] = useState('{}');
  const [deleteId, setDeleteId] = useState('');

  const handlePut = () => {
    try {
      const parsed = JSON.parse(putJson);
      dispatch(updateProduct({ id: Number(putId), ...parsed }));
    } catch {
      alert('Invalid JSON');
    }
  };

  return (
    <div className="min-h-screen px-8 pt-24 text-gray-900 transition bg-white md:px-16 dark:bg-black/90 dark:text-white ">
      <h1 className="mb-10 text-3xl font-bold text-pink-500">
        DummyJSON CRUD Playground
      </h1>

      <div className="p-6 mb-10 bg-gray-100 shadow rounded-xl dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">POST — Create Product</h2>

        <input
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="Product title"
          className="w-full px-4 py-2 mb-4 bg-white dark:bg-gray-700 rounded-xl"
        />

        <button
          onClick={() => dispatch(createProduct({ title: postTitle }))}
          className="px-6 py-2 text-white bg-pink-500 rounded-xl hover:bg-pink-600"
        >
          Create
        </button>
      </div>

      

      <div className="p-6 mb-10 bg-gray-100 shadow rounded-xl dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">PUT — Update Product</h2>

        <input
          value={putId}
          onChange={(e) => setPutId(e.target.value)}
          placeholder="Product ID"
          className="w-full px-4 py-2 mb-4 bg-white rounded-xl dark:bg-gray-700"
        />

        <textarea
          value={putJson}
          onChange={(e) => setPutJson(e.target.value)}
          placeholder='{"title": "New Title"}'
          rows={4}
          className="w-full px-4 py-2 mb-4 bg-white rounded-xl dark:bg-gray-700"
        />

        <button
          onClick={handlePut}
          className="px-6 py-2 text-white bg-blue-500 rounded-xl hover:bg-blue-600"
        >
          Update
        </button>
      </div>

      <div className="p-6 mb-10 bg-gray-100 shadow rounded-xl dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">DELETE — Remove Product</h2>

        <input
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          placeholder="Product ID"
          className="w-full px-4 py-2 mb-4 bg-white rounded-xl dark:bg-gray-700"
        />

        <button
          onClick={() => dispatch(deleteProduct(Number(deleteId)))}
          className="px-6 py-2 text-white bg-red-500 rounded-xl hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      <div className="p-6 mb-10 bg-gray-100 rounded-lg shadow dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Clear Result</h2>

        <button
          onClick={() => dispatch(clearResult())}
          className="px-6 py-2 text-black transition bg-gray-300 rounded-xl dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      <div className="mb-6 text-lg">
        <span className="font-semibold">Status:</span>{' '}
        <span
          className={
            status === 'loading'
              ? 'text-yellow-500'
              : status === 'success'
              ? 'text-green-500'
              : status === 'error'
              ? 'text-red-500'
              : 'text-gray-500'
          }
        >
          {status}
        </span>
      </div>

      {result && (
        <div className="p-6 overflow-auto bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Response:</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(result, null, 4)}
          </pre>
        </div>
      )}
    </div>
  );
}
