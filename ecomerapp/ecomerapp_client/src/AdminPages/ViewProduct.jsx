import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../CommonComponent/AdminNav';
import ErrorMessage from '../CommonComponent/ErrorMessage';
import axios from 'axios';
import styles from './ViewProduct.module.css'
import {Container,Col, Row} from 'reactstrap'

const ViewProduct = () => {
  const [showToast, setShowToast] = useState(false);
  const [proData, setProData] = useState([]);
  const [msg, setMsg] = useState('');
  const [searchPro, setSearchPro] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState('');
  const token = localStorage.getItem('token');
    const [files, setFiles] = useState([]);
      const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  const getPro = async () => {
    try {
      const resultPro = await axios.get("http://localhost:5000/adminproduct/viewproduct");
      if (resultPro.data.viewprosts === 1) {
        setShowToast(true);
        setMsg(resultPro.data.msg || "No products found");
        setType('error');
        setTimeout(() => setShowToast(false), 3000);
      } else {
        setProData(resultPro.data.product || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChangeStatus = async (newStatus) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/adminproduct/changestatus",
        {
          productIds: selectedRows,
          newStatus: newStatus
        }
      );
      setShowToast(true);
      setMsg(result.data.msg);
      setType('success');
      setTimeout(() => setShowToast(false), 3000);
      getPro();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

   const handleUploadImages = async () => {
    const formData = new FormData()
    for (const  file of files){
      formData.append('images', file)

try {
  await axios.post(`http://localhost:5000/adminproduct/uploadimage/${selectedProductId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

  setShowToast(true);
  setMsg('Images Uploaded Successfully')
  setType('success')
  closeModal()
   getPro()

    }
    catch (error) {
      console.error(error)
       setShowToast(true);
  setMsg('Images Upload File')
  setType('success')
  closeModal()
   getPro()
    }
  }
  };
    const openModal =async(proId)=>{
      setIsModalOpen(true)
      setSelectedProductId(proId)

    }
     const closeModal =async()=>{
      setIsModalOpen(false)
      setFiles([])

    }

    const handleFileChanges = (e)=>{
      setFiles(e.target.files)
    }

  const deletePro =async(proId)=>{
    try {
       const response = await axios.delete(`http://localhost:5000/adminproduct/deletepro/${proId}`);
       getPro()
    } catch (error) {
      console.error(error)
    }

  }

  const handleDeleteMPro = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/adminproduct/deletemproduct",
        {
          productIds: selectedRows,
        }
      );
      setShowToast(true);
      setMsg(result.data.msg);
      setType('success');
      setTimeout(() => setShowToast(false), 3000);
      getPro();
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/adminlogin');
    } else {
      getPro();
    }
  }, []);


const handleCheckboxChange = async (productId) => {
  setSelectedRows((prevSelectedRows) => {
    if (prevSelectedRows.includes(productId)) {
      return prevSelectedRows.filter((id) => id !== productId);
    } else {
      return [...prevSelectedRows, productId];
    }
  });
};


  return (
    <>
      <ErrorMessage showToast={showToast} msg={msg} type={type} />
      <AdminNav />
    

      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-12 col-sm-12'>
            <table className='table table-striped border'>
              <thead>
                <tr className='bg-primary text-white'>
                  <th scope='col'>Select</th>
                  <th scope='col'>#</th>
                  <th scope='col'>Product Image</th>
                  <th scope='col'>Product Name</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Status</th>
                  <th scope='col' colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <select
                      name="pro_sts"
                      className="form-control"
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="pending">Pending</option>
                      <option value="enable">Enabled</option>
                      <option value="disable">Disable</option>
                    </select>
                  </td>
                  <td colSpan={5}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Product"
                      onChange={(e) => setSearchPro(e.target.value)}
                     
                    />
                  </td>
                </tr>

                {proData.length > 0 ? (
                  proData
                    .filter(product =>
                      (!selectedStatus || product.product_status === selectedStatus) &&
                      (searchPro === '' || product.product_name.toLowerCase().includes(searchPro.toLowerCase()))
                    )
                    .map((product, index) => (
                      <tr key={product._id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(product._id)}
                            onChange={() => handleCheckboxChange(product._id)}
                          />
                        </td>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`http://localhost:5000/pros/${product.product_thumb}`}
                            alt={product.product_name}
                            style={{ width: "3.75rem", height: "3.75rem", objectFit: "cover", mixBlendMode:'multiply' }}
                          />
                        </td>
                        <td>{product.product_name}</td>
                        <td>{product.category || "N/A"}</td>
                        <td>{product.product_sale_price}</td>
                        <td>{product.product_status}</td>
                    
                        <td>
                          <a href="#" className='btn btn-danger' onClick={()=>deletePro(product._id)}>Delete</a>
                        </td>
                        <td>
                          <button className='btn btn-success'  onClick={()=>openModal(product._id)}>Upload Image</button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No products available</td>

                  </tr>
                )}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={7}>
                    <button
                      className='btn btn-sm btn-outline-primary'
                      onClick={() => handleChangeStatus("pending")}
                    >
                      Pending
                    </button>
                    &nbsp;
                    <button
                      className='btn btn-sm btn-outline-success'
                      onClick={() => handleChangeStatus("enable")}
                    >
                      Enable
                    </button>
                    &nbsp;
                    <button
                      className='btn btn-sm btn-outline-danger'
                      onClick={() => handleChangeStatus("disable")}
                    >
                      Disable
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDeleteMPro()}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {
        isModalOpen&&(
          <div className={styles.modal}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <input type="file" multiple onChange={handleFileChanges}/>
            <button className='btn btn-primary' onClick={handleUploadImages}>Upload</button>
            
          </div>
        )
      }
    </>
  );
};

export default ViewProduct;
