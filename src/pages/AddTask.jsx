import { useState, useRef, useMemo, useContext } from 'react';
import Nav from "../components/Nav";
import { GlobalContext } from '../contexts/GlobalContext';
const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/"~`;

function AddTask() {
    const { addTask } = useContext(GlobalContext);

    // Input form
    const [title, setTitle] = useState("");
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    // alert 
    const [alert, setAlert] = useState({
        show: false,
        type: "",
        message: ""
    });

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
    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (titleValidation.isValid) {
            const newTask = {
                title: title,
                description: descriptionRef.current.value,
                status: statusRef.current.value
            }

            try {
                await addTask(newTask);
                // reset form only after await addTask response
                setTitle("");
                descriptionRef.current.value = "";
                statusRef.current.value = "";
                // success alert
                setAlert({
                    show: true,
                    type: "success",
                    message: "Task aggiunta con successo"
                })
                setTimeout(() => setAlert({ show: false }), 3000);
            } catch (error) {
                // error alert
                setAlert({
                    show: true,
                    type: "error",
                    message: "Errore nell'aggiunta della task"
                })
                setTimeout(() => setAlert({ show: false }), 3000);
            };
        };
    };

    return (
        <>
            <Nav />
            <h1>AddTask Page</h1>

            {/* Custom alert */}
            {alert.show && (
                <div className={`custom-alert ${alert.type}`}>{alert.message}</div>
            )}

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
                <button type='submit' disabled={!titleValidation.isValid}>Aggiungi Task</button>
            </form>
        </>
    )
}

export default AddTask;