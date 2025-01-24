import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Show loading state

    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      setIsLoading(false); // Hide loading state
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {email,password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setEmail(""); // Clear the input fields
      setPassword(""); // Clear the password field
      setIsAuthenticated(true); // Set authentication status
      toast.success(response.data.message); // Show success message
    } catch (error) {
      // If there's an error, show the error message
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false); // Hide loading state after the request completes
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/home"} />; // Redirect to home page if authenticated
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center overflow-y-hidden"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleLogin} className="w-100">
        <h3 className="text-center">LOGIN</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="text-center">
          <Form.Label>
            Not Registered?{" "}
            <Link to={"/register"} className="text-decoration-none">
              REGISTER NOW
            </Link>
          </Form.Label>
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          className="w-100 text-light fw-bold fs-5"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Logging in..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
