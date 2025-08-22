import axios from 'axios';
import React, { useEffect, useState } from 'react'
import  { Container, Row,Col, FormGroup, Input, Label, CardText, CardTitle, CardBody, Card, CardImg, Button } from 'reactstrap'
const Product = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState({min:0,max:100000});
    const [proData,setProData] = useState([])
    const [filteredProduct,setFilteredProduct] = useState([])
    const getCategory = async () => {
    try {
      const allcategory = await axios.get("http://localhost:5000/usercategory/getcategory");
     setCategoryData(allcategory.data.cat)
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async()=>{
    try {
      const allPro = await axios.get("http://localhost:5000/userproducts/getallproducts")
       setProData(allPro.data.allproducts)
       setFilteredProduct(allPro.data.allproducts)
    } catch (error) {
      console.error(error)
    }
  }
  const filterProduct = () => {
  const filtered = proData.filter((product) => {
    const withinPriceRange =
      product.product_sale_price >= priceRange.min &&
      product.product_sale_price <= priceRange.max;

    const inSelectedCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.pro_cat._id);
    // Check if Product Category is selected

    return withinPriceRange && inSelectedCategory;
  });

  setFilteredProduct(filtered);
};


  const handleCategoryChange =(categoryId)=>{
    setSelectedCategories(prev=>{
      if(prev.includes(categoryId)){
        return prev.filter(id=>id !== categoryId)
      }
      else{
        return [...prev,categoryId]
      }
      
    })
    console.log(selectedCategories)

  }

  const isSaleActive = (product)=>{
    const saleStartDate = new Date(product.product_sale_start_date)
    const saleEndDate = new Date(product.product_sale_last_date)
    const today = new Date()

    return today>=saleStartDate && today<=saleEndDate
  }

    useEffect(() => {
     getCategory()
     getProduct()
    },[]);

    useEffect(()=>{
      filterProduct()
    }, [priceRange,selectedCategories,proData])

  return (
    <>
    <Container>
        <Row>
            <Col md="2" lg="2">
            <h5>Filter by Category</h5>
            {
                categoryData.map((category)=>{
                    return(
                        <FormGroup check key={category._id}>
                            <label check>
                                <Input type="checkbox" onChange={()=>handleCategoryChange(category._id)} />
                                {category.cat_name}
                            </label>
                        </FormGroup>
                    )
                })
            }

            <hr />
            <h5>Filter by Price</h5>
            <Label>Min {priceRange.min} PKR</Label>
            <Input type='range' min={0} max={1000}  value={priceRange.min} onChange={(e)=>setPriceRange({...priceRange,min:e.target.value})}/>
               <Label>Max {priceRange.max} PKR</Label>
            <Input type='range' min={3000} max={1000000} value={priceRange.max} onChange={(e)=>setPriceRange({...priceRange,max:e.target.value})}/>
            </Col>

            <Col md="10" lg="10" className="mt-5">
  <Row>
    {
  filteredProduct.map((product) => {

        return(
<Col md="3" lg="3" className="mb-4">
      <Card className="position-relative" color="light">
        <CardImg top width="100%" src={`http://localhost:5000/pros/${product.product_thumb}`} alt="Product Name" />
        <CardBody>
          <CardTitle
            tag="h5"
            style={{
              height: '3em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.product_name}
          </CardTitle>
          <CardText>
            {
              isSaleActive(product) && product.product_sale_price?
              (
                <>
                  <span style={{textDecoration:'line-through'}}>{product.product_org_price}</span>
            <span className='text-danger ml-2' style={{fontWeight:'bold'}}>{product.product_sale_price}</span>
      
                </>
              ):
              ( <span style={{fontWeight:'bold'}}>{product.product_org_price}</span>)
            }
              </CardText>
          <div>
            <Button className="btn btn-sm" style={{borderRadius:'0px'}} color="danger" >Add to Cart</Button>
          </div>
        </CardBody>
      </Card>
    </Col>
        )
      })
    }
    
  </Row>
</Col>

        </Row>
    </Container>

    </>
  )
}

export default Product