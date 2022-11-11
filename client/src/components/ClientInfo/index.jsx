import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

export default function ClientInfo({ client, data }) {
    //if no client
    const user = !client ? data : client;

    return (
        <>
            <h5 className="mt-5">Client Information</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <FaIdBadge className="icon" /> {user.name}
                </li>
                <li className="list-group-item">
                    <FaEnvelope className="icon" /> {user.email}
                </li>
                <li className="list-group-item">
                    <FaPhone className="icon" /> {user.phone}
                </li>
            </ul>
        </>
    );
}
