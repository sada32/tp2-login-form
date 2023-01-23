import {Button, Container, Modal} from "react-bootstrap";
import {useState} from "react";

function Home() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    return (
        <Container className="py-5">
            <h1>Dashboard</h1>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Informasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Tidak ada kegiatan yang terjadi, Silahkan melakukan login ulang!</span>
                    <Button className="btn-danger d-flex align-self-center">Stop</Button>
                </Modal.Body>

            </Modal>
        </Container>

    );
}

export default Home;