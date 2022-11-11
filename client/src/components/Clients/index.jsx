import { useQuery } from "@apollo/client";
import ClientRow from "../ClientRow";
import { GET_CLIENTS } from "../../queries/clients";

export default function Clients() {
    const { data } = useQuery(GET_CLIENTS);

    return (
        <>
            {data && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map((client) => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
