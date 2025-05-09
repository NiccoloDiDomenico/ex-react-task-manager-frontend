import { useState, useRef, useMemo } from 'react';
import Nav from "../components/Nav";
const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/"~`;

function AddTask() {
    // Input form
    const [title, setTitle] = useState("");
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    // check title input
    const titleValidation = useMemo(() => {
        return {
            isValid: title.length > 0 && ![...title].some((char) => symbols.includes(char)),
            errors: {
                isEmpty: title.length === 0,
                hasSymbols: [...title].some((char) => symbols.includes(char))
            },
            messages: {
                isEmpty: "Il campo non può essere vuoto",
                hasSymbols: "Non può contenere simboli speciali"
            }
        }
    }, [title]);

    // Form submit
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (titleValidation.isValid) {
            console.log(`
                    Nome: ${title},
                    Description: ${descriptionRef.current.value},
                    Status: ${statusRef.current.value}
                `);
        } else {
            console.log("Form non valido");

        }
    }

    return (
        <>
            <Nav />
            <h1>AddTask Page</h1>

            {/* Form section */}
            <form onSubmit={handleFormSubmit}>
                {/* Title */}
                <div>
                    <label htmlFor="title">Nome</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={titleValidation.isValid ? "valid" : "error"}
                    />
                </div>
                {titleValidation.errors.isEmpty && (
                    <span className='error-message'>{titleValidation.messages.isEmpty}</span>
                )}
                {titleValidation.errors.hasSymbols && (
                    <span className='error-message'>{titleValidation.messages.hasSymbols}</span>
                )}
                {/* Description */}
                <div>
                    <label htmlFor="description">Descrizione</label>
                    <textarea
                        id="description"
                        ref={descriptionRef}
                    ></textarea>
                </div>
                {/* Status */}
                <div>
                    <label htmlFor="status">Stato</label>
                    <select id="status" ref={statusRef} defaultValue="To do">
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button type='submit'>Invia</button>
            </form>
        </>
    )
}

export default AddTask;