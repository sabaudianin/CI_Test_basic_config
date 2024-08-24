import {LABELS} from "./Tekst";
import {useState, useEffect} from "react";

export function AgeChecker() {
    const [age, setAge] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [value, setValue] = useState("");

    const handleBlur = () => {
        setAge(Number(value));
    };

    const handleChange = (event) => setValue(event.target.value);

    const handleClick = () => setIsLoading(true);

    useEffect(() => {
        if (!isLoading) {
            return;
        }

        setIsLoading(true);
        const timer = setTimeout(() => {
            const newMessage =
                age >= 18 ? LABELS.YOU_ARE_ADULT : LABELS.YOU_ARE_MINOR;

            setMessage(newMessage);
            setIsLoading(false);
        }, 250);

        return () => {
            clearTimeout(timer);
        };
    }, [age, isLoading]);

    return (
        <div>
            <input
                type="number"
                value={age}
                placeholder={LABELS.TYPE_YOUR_AGE}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <button onClick={handleClick}>{LABELS.CHECK}</button>
            <Label isLoading={isLoading} label={message}/>
        </div>
    );
}

function Label({isLoading, label}) {
    if (isLoading) {
        return <p role="status">{LABELS.LOADING}</p>;
    }

    return <p>{label}</p>;
}
