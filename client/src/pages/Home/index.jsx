import Clients from "../../components/Clients";
import Projects from "../../components/Projects";
import Form from "../../components/Form";

export default function Home() {
    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <Form />
            </div>
            <Projects />
            <Clients />
        </>
    );
}
