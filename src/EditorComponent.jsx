import React, { useEffect, useState, useCallback } from "react";
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Editor } from 'slate'

export default function EditorComponent({}) {
  const [editor] = useState(() => withReact(createEditor()))
  const renderleaf =useCallback( props => <Leaf {...props}/>, []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        { text: 'asdf', bold: true }
      ],
    },
  ])

  useEffect(() => {
    console.log(value)
  },[value])

  const Leaf = ({ attributes, children, leaf }) => {
    console.log(leaf)
    if (leaf.bold) {
      children = <b>{children}</b>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
  }

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }


  return (
    <>
    <button onClick={event => {
      event.preventDefault();
      toggleMark(editor, "bold")
    }}>
      bold
    </button>
    <button onClick={event => {
      event.preventDefault();
      toggleMark(editor, "italic")
    }}>
      italic
    </button>
    <div style={{
      background: "white",
      color: "black",
      width: "300px",
      height: "100px",
      margin: "50px"
    }}>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <Editable
          renderLeaf={renderleaf}
        />
      </Slate>
    </div>
    </>
  );
}
