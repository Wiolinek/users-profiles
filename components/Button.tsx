import { ReactNode } from "react";

interface ButtonProps {
    type?: "button" | "submit"
    label: ReactNode;
    customClass: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ type = "button", label, customClass, disabled, onClick }: Readonly<ButtonProps>) {

    return (
        <button
            type={type}
            className={`border-2 p-2 rounded-md ${customClass}`}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
