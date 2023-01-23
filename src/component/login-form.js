import { useRef, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

function FormLogin({ validateLogin }) {

    const [staticUser] = useState({
        username: "sada62510@gmail.com",
        password: "Sada12345",
    });

    const schema = yup.object().shape({
        username: yup.string().required().email(),
        password: yup.string().required(),
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            username: "",
            password: "",
        },
        validateOnChange: false,
        onSubmit: (values, { setFieldError }) => {
            const token = captchaRef.current.getValue();
            if (!token) {
                alert('Recaptcha gagal.')
                return;
            }

            if (
                values.username !== staticUser.username ||
                values.password !== staticUser.password
            ) {
                setFieldError("username", "Username salah");
                setFieldError("password", "Password salah");
                validateLogin(false);
            } else {
                validateLogin(true);
            }
        },
    });

    const captchaRef = useRef();

    return (
        <div className="container">
            <h2>Login</h2>
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-4">
                    <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="validationFormik01">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Masukkan username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="validationFormik02">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Masukkan password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationFormik03" className="mt-3">
                                <ReCAPTCHA
                                    ref={captchaRef}
                                    sitekey="6LekJkgiAAAAACRV0-ISH-SP-fWCyspjdywPi-_G"
                                    size="normal"
                                />
                            </Form.Group>
                        <Button type="submit">Login</Button>
                    </Form>
                </div>
            </div>

        </div>
    );
}

export default FormLogin;