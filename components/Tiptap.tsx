import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Toolbar from "@/components/Toolbar";

interface TiptapProps {
    description: string;
    onChange: (content: string) => void;
}

export default function Tiptap({ description, onChange }: Readonly<TiptapProps>) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Italic,
            Bold,
            Underline,
            Heading,
        ],
        content: description,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[150px] border-input px-2 py-1",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    return (
        <>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
}
