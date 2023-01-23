import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../component/login-form";
import CountdownTimer from "../component/countdown";

function Index() {
    const [count, setCount] = useState(0);
    const [limit] = useState(3);
    const [canLogin, setCanLogin] = useState(false);

    useEffect(() => {
        const canLoginAt = localStorage.getItem("canLoginAt");
        if (canLoginAt) {
            const dateNow = new Date();
            const dateCanLogin = new Date(canLoginAt);

            if (dateNow > dateCanLogin) {
                setCanLogin(true);
            } else {
                setCanLogin(false);
            }
        } else {
            setCanLogin(true);
        }
    }, []);

    useEffect(() => {
        if (count >= limit) {
            setRestrictTime();
            setCanLogin(false);
        }
    }, [count, limit]);

    const setRestrictTime = () => {
        const t = new Date();
        t.setSeconds(t.getSeconds() + 30);

        localStorage.setItem("canLoginAt", t);
    };

    const removeRestrictTime = () => {
        localStorage.setItem("canLoginAt", "");
    };

    const validateLogin = (val) => {
        if (val) {
            removeRestrictTime();
        } else {
            setCount(count + 1);
        }
    };

    return (
        <Container className="py-5">
            <Row>
                <Col md="12">
                    {canLogin ? (
                        <LoginForm validateLogin={validateLogin} />
                    ) : (
                        <CountdownTimer />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Index;