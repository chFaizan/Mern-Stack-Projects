import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../CommonComponent/ErrorMessage';
import AdminNav from '../CommonComponent/AdminNav';

const AddProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState('');
  const [type, setType] = useState('');
  const [viewcatData, setViewcatData] = useState([]);
  const [file, setFile] = useState(null);


  const [formValues, setFormValues] = useState({
    pro_cat: '',
    product_name: '',
    product_org_price: '',
    product_sale_price: '',
    product_short_desc: '',
    product_long_desc: '',
    product_sale_start_date: '',
    product_sale_last_date: ''
  });

  const getCat = async () => {
    try {
      const result = await axios.get("http://localhost:5000/admincategory/getcat");
      setViewcatData(result.data.cat || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/adminlogin');
    } else {
      getCat();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addPro = async () => {
    if (!file) {
      setShowToast(true);
      setMsg('Please select a file');
      setType('error');
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const formData = new FormData();
    for (const key in formValues) {
      let val = formValues[key];
      if (key === 'product_sale_start_date' || key === 'product_sale_last_date') {
        val = new Date(val).getTime(); // convert to timestamp
      }
      formData.append(key, val);
    }
    formData.append('product_thumb', file);

    try {
      const res = await axios.post('http://localhost:5000/adminproduct/addproduct', formData);
      if (res.data.sts === 0) {
        setShowToast(true);
        setMsg(res.data.msg);
        setType('success');
      } else {
        setShowToast(true);
        setMsg(res.data.msg || 'Product upload failed');
        setType('error');
      }
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      setMsg("Server error");
      setType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <ErrorMessage showToast={showToast} msg={msg} type={type} />
      <AdminNav />
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header bg-primary text-white text-center'>
                <h5>Add Product</h5>
              </div>
              <div className='card-body'>
                <div className='row mb-3'>
                  <div className='col-md-4'>
                    <label className='form-label'>Product Category</label>
                    <select
                      className='form-control'
                      name='pro_cat'
                      onChange={handleInputChange}
                      value={formValues.pro_cat}
                    >
                      <option value="">Select Category</option>
                      {viewcatData.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.cat_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col-md-4'>
                    <label className='form-label'>Product Name</label>
                    <input
                      type='text'
                      className='form-control'
                      name='product_name'
                      value={formValues.product_name}
                      onChange={handleInputChange}
                      placeholder='Enter Product Name'
                    />
                  </div>
                  <div className='col-md-4'>
                    <label className='form-label'>Product Thumbnail</label>
                    <input
                      type='file'
                      className='form-control'
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-md-4'>
                    <label className='form-label'>Short Description</label>
                    <input
                      type='text'
                      className='form-control'
                      name='product_short_desc'
                      value={formValues.product_short_desc}
                      onChange={handleInputChange}
                      placeholder='Short description'
                    />
                  </div>
                  <div className='col-md-4'>
                    <label className='form-label'>Long Description</label>
                    <textarea
                      className='form-control'
                      name='product_long_desc'
                      value={formValues.product_long_desc}
                      onChange={handleInputChange}
                      placeholder='Long description'
                    />
                  </div>
                  <div className='col-md-4'>
                    <label className='form-label'>Original Price</label>
                    <input
                      type='number'
                      className='form-control'
                      name='product_org_price'
                      value={formValues.product_org_price}
                      onChange={handleInputChange}
                      placeholder='Enter original price'
                    />
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-md-4'>
                    <label className='form-label'>Sale Price</label>
                    <input
                      type='number'
                      className='form-control'
                      name='product_sale_price'
                      value={formValues.product_sale_price}
                      onChange={handleInputChange}
                      placeholder='Enter sale price'
                    />
                  </div>
                  <div className='col-md-4'>
                    <label className='form-label'>Sale Start Date</label>
                    <input
                      type='date'
                      className='form-control'
                      name='product_sale_start_date'
                      value={formValues.product_sale_start_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='col-md-4'>
                    <label className='form-label'>Sale End Date</label>
                    <input
                      type='date'
                      className='form-control'
                      name='product_sale_last_date'
                      value={formValues.product_sale_last_date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-12 text-center'>
                    <button className='btn btn-primary' type='button' onClick={addPro}>
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
