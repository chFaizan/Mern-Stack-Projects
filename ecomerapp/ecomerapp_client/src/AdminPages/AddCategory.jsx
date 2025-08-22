import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../CommonComponent/AdminNav';
import ErrorMessage from '../CommonComponent/ErrorMessage';
import axios from 'axios';

const AddCategory = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [msg, setMsg] = useState('');
  const [viewcatData, setViewcatData] = useState([]);
  const [type, setType] = useState('');
  const [catName, setCatName] = useState('');
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');
  

  const getCat = async () => {
    try {
      const result = await axios.get("http://localhost:5000/admincategory/getcat");
      console.log(result.data); // Debug line
      if (result.data.cat) {
        setViewcatData(result.data.cat);
      } else {
        setViewcatData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const delCat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admincategory/deletecat/${id}`);
      getCat();
    } catch (error) {
      console.error(error);
      setShowToast(true);
      setMsg('Failed to delete category');
      setType('error');
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  useEffect(() => {
    if (token == null) {
      navigate('/adminlogin');
    } else {
      getCat();
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    setCatName(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addCat = async () => {
    if (!file || !catName.trim()) {
      setShowToast(true);
      setMsg('Please provide both category name and image');
      setType('error');
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const formData = new FormData();
    formData.append('cat_name', catName);
    formData.append('cat_img', file);

    try {
      const res = await axios.post(
        'http://localhost:5000/admincategory/addcategory',
        formData
      );

      if (res.data.sts === 0) {
        setShowToast(true);
        setMsg(res.data.msg);
        setType('success');
        getCat();
        setCatName('');
        setFile(null);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        setShowToast(true);
        setMsg('File Upload Failed');
        setType('error');
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error(error);
      setShowToast(true);
      setMsg('Server Error: Failed to add category');
      setType('error');
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <ErrorMessage showToast={showToast} msg={msg} type={type} />
      <AdminNav />
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-4 col-sm-12 align-self-center'>
            <div className='card'>
              <div className='card-header bg-primary text-white text-center'>
                <h5>Add Category</h5>
              </div>
              <div className='card-body'>
                <div className='mb-3'>
                  <label htmlFor='cat_name' className='form-label'>Product Category</label>
                  <input
                    type='text'
                    className='form-control'
                    id='cat_name'
                    name='cat_name'
                    placeholder='Enter Category'
                    value={catName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='cat_img' className='form-label'>Category Image</label>
                  <input
                    type='file'
                    className='form-control'
                    id='cat_img'
                    name='cat_img'
                    onChange={handleFileChange}
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type='button'
                    className='form-control btn btn-primary'
                    value='Add Category'
                    onClick={addCat}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-8 col-sm-12'>
            <table className='table table-striped border'>
              <thead>
                <tr className='bg-primary text-white'>
                  <th scope='col'>#</th>
                  <th scope='col'>Category Name</th>
                  <th scope='col'>Category Image</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(viewcatData) && viewcatData.length > 0 ? (
                  viewcatData.map((cats, index) => (
                    <tr key={cats._id}>
                      <td>{index + 1}</td>
                      <td>{cats.cat_name}</td>
                      <td>
                        <img
                          src={`http://localhost:5000/uploads/${cats.cat_img}`}
                          style={{width:'6.25rem', height:'auto', mixBlendMode:"multiply" }}
                          alt={cats.cat_name}
                         
                        />
                      </td>
                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={() => delCat(cats._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No categories found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
