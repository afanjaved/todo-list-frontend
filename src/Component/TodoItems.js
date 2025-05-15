// src/components/TodoItem.js
import React from "react";


export default function TodoItem({ todo, index, onDelete }) {
    return (
      <div className="flex justify-between items-center bg-white shadow p-4 rounded mb-2">
        <span>{todo}</span>
        <button
          onClick={() => onDelete(index)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    );
  }
  