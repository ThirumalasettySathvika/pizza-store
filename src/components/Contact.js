import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Contact.css'; // Import the CSS file for custom styles

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  message: Yup.string().required('Required')
});

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axios.post('http://localhost:5000/contact', values)
            .then(response => {
              console.log('Message sent:', response.data);
              setSubmitting(false);
              resetForm();
            })
            .catch(error => {
              console.error('Error sending message:', error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" className="rounded-input" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="rounded-input" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <Field as="textarea" name="message" className="rounded-input" />
              <ErrorMessage name="message" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>Send Message</button>
          </Form>
        )}
      </Formik>
      <div className="contact-info">
        <h3>Our Contact Information</h3>
        <p><strong>Address:</strong> 123 Pizza Street, Food City, Tirupati</p>
        <p><strong>Phone:</strong> +91 987654321</p>
        <p><strong>Email:</strong> contact@pizzastore.com</p>
      </div>
    </div>
  );
}

export default Contact;
