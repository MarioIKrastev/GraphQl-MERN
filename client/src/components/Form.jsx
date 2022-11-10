import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clients";
import { useMutation } from "@apollo/client";

export default function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({
                query: GET_CLIENTS,
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, addClient],
                },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone) {
            return alert("fill all fields");
        }
        addClient(name, email, phone);
        setName("");
        setEmail("");
        setPhone("");
    };
    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addClientModal"
            >
                <div className="d-flex align-items-center">
                    <FaUser />
                    <div>Add Client</div>
                </div>
            </button>
            <div
                className="modal fade"
                id="addClientModal"
                role="dialog"
                aria-labelledby="addClientModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="addClientModalLabel"
                            >
                                Add Client
                            </h5>
                            <button
                                type="button"
                                className="close btn btn-primary"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <label className="form-label">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control mb-3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control mb-3"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="form-label">Phone</label>
                                <input
                                    id="phone"
                                    type="text"
                                    className="form-control mb-3"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-secondary "
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className="btn btn-primary "
                                        type="submit"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
