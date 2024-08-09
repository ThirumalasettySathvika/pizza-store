import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Must be positive'),
  description: Yup.string().required('Required')
});

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/items/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error('Error fetching item:', error));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h2>Update Item</h2>
      <Formik
        initialValues={item}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios.put(`http://localhost:5000/items/${id}`, values)
            .then(response => {
              console.log('Item updated:', response.data);
              toast.success('Item updated successfully!');
              setSubmitting(false);
              setTimeout(() => {
                navigate('/items');
              }, 2000); // Delay navigation to allow the toast to be visible
            })
            .catch(error => {
              console.error('Error updating item:', error);
              toast.error('Error updating item!');
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <Field type="number" name="price" />
              <ErrorMessage name="price" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>Update Item</button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default UpdateItem;