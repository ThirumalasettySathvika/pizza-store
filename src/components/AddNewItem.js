import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddNewItem.css'; // Import the CSS file for custom styles

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Must be positive'),
  description: Yup.string().required('Required')
});

function AddNewItem() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Add New Item</h2>
      <Formik
        initialValues={{ name: '', price: '', description: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios.post('http://localhost:5000/items', values)
            .then(response => {
              console.log('Item added:', response.data);
              toast.success('Item added successfully!');
              setSubmitting(false);
              setTimeout(() => {
                navigate('/items');
              }, 2000); // Delay navigation to allow the toast to be visible
            })
            .catch(error => {
              console.error('Error adding item:', error);
              toast.error('Error adding item!');
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
              <label htmlFor="price">Price</label>
              <Field type="number" name="price" className="rounded-input" />
              <ErrorMessage name="price" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field type="text" name="description" className="rounded-input" />
              <ErrorMessage name="description" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>Add Item</button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default AddNewItem;