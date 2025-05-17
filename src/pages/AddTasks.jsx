import { useState, useRef, useMemo, useContext } from 'react';
import Nav from "../components/Nav";
import { GlobalContext } from '../contexts/GlobalContext';
import styles from '../css/AddTasks.module.css';
const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/"~`;

function AddTask() {
    const { addTask } = useContext(GlobalContext);

    // States and Ref
    const [title, setTitle] = useState("");
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

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

            <div className={styles.formContainer}>
                <h1>Add New Task</h1>

                {/* Form  */}
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Nome</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={titleValidation.isValid ? styles.validInput : styles.invalidInput}
                        />
                        {titleValidation.errors.isEmpty && (
                            <span className={styles.errorMessage}>{titleValidation.messages.isEmpty}</span>
                        )}
                        {titleValidation.errors.hasSymbols && (
                            <span className={styles.errorMessage}>{titleValidation.messages.hasSymbols}</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Descrizione</label>
                        <textarea
                            id="description"
                            ref={descriptionRef}
                        ></textarea>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="status">Stato</label>
                        <select id="status" ref={statusRef} defaultValue="To do">
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={!titleValidation.isValid}
                        className={styles.submitButton}
                    >
                        Aggiungi Task
                    </button>
                </form>
            </div>

            {alert.show && (
                <div className={`${styles.customAlert} ${styles[alert.type]}`}>
                    {alert.message}
                </div>
            )}
        </>
    );
}

export default AddTask;