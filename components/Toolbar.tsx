"use client";

import { Editor } from '@tiptap/core';
import { HTMLProps } from 'react';
import Button from "@/components/Button";

interface ToolbarProps extends HTMLProps<HTMLDivElement> {
    editor: Editor | null;
}

export default function Toolbar({ editor }: Readonly<ToolbarProps>) {
    const activeClass = 'bg-primary border-primary text-white';

    if (!editor) {
        return null
    }

    return (
        <div className="flex gap-2">
            <Button
                label="H1"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                customClass={editor.isActive('heading', { level: 1 }) ? activeClass : ''}
            />
            <Button
                label="H2"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                customClass={editor.isActive('heading', { level: 2 }) ? activeClass : ''}
            />
            <Button
                label="H3"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                customClass={editor.isActive('heading', { level: 3 }) ? activeClass : ''}
            />
            <Button
                label="Paragraph"
                onClick={() => editor.chain().focus().setParagraph().run()}
                customClass={editor.isActive('paragraph') ? activeClass : ''}
            />
            <Button
                label="Bold"
                onClick={() => editor.chain().focus().toggleBold().run()}
                customClass={editor.isActive('bold') ? activeClass : ''}
            />
            <Button
                label="Italic"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                customClass={editor.isActive('italic') ? activeClass : ''}
            />
            <Button
                label="Underline"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                customClass={editor.isActive('underline') ? activeClass : ''}
            />
        </div>
    )
}