interface ButtonProps {
    type?: "button" | "submit"
    label: string;
    customClass: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ type = "button", label, customClass, onClick }: Readonly<ButtonProps>) {

    return (
        <button
            type={type}
            onClick={onClick}
            className={`border-2 p-2 rounded-md ${customClass}`}>
            {label}
        </button>
    );
}
