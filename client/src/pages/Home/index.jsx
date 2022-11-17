import Clients from "../../components/Clients";
import Projects from "../../components/Projects";
import FormClient from "../../components/FormClient";
import FormProject from "../../components/FormProject";

export default function Home() {
    return (
        <>
            <div className="d-flex flex-row justify-content-between mb-5">
                <div className="d-flex flex-row justify-content-between">
                    <FormClient />
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <FormProject />
                </div>
            </div>
            <Projects />
            <Clients />
        </>
    );
}
