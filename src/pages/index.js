import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../component/login-form";
import CountdownTimer from "../component/countdown";

function Index() {
    const [count, setCount] = useState(0);
    const [limit] = useState(3);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const time = localStorage.getItem("time");
        if (time) {
            const dateNow = new Date();
            const dateisLogin = new Date(time);

            if (dateNow > dateisLogin) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        } else {
            setIsLogin(true);
        }
    }, []);

    useEffect(() => {
        if (count >= limit) {
            setRestrictTime();
            setIsLogin(false);
        }
    }, [count, limit]);

    const setRestrictTime = () => {
        const t = new Date();
        t.setSeconds(t.getSeconds() + 30);

        localStorage.setItem("time", t);
    };

    const removeRestrictTime = () => {
        localStorage.setItem("time", "");
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
                    {isLogin ? (
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