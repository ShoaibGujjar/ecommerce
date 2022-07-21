              // <Row className='py-3'>
              //   <Col md={6}>
              //     <Image src={product.image} alt={product.name} id='img-st' />
              //   </Col>
              //   <Col className='ListGroup' >
              //     <ListGroup className='ListGroup' variant='flush'>
              //       <ListGroup.Item>
              //         <h3>{product.name} </h3>
              //       </ListGroup.Item>

              //       <ListGroup.Item>
              //         Description:{product.description}
              //       </ListGroup.Item>
              //     </ListGroup>
              //   </Col>
              //   <Col md={3}>
              //     {/* <Card> */}
              //     <ListGroup variant='flush'>
              //       <ListGroup.Item>
              //         <Row>
              //           <Col>
              //             price:
              //           </Col>
              //           <Col>
              //             <strong>
              //               ${product.price}
              //             </strong></Col>
              //         </Row>
              //       </ListGroup.Item>
              //       <ListGroup.Item>
              //         {/* <Rating value={product.rating} text={`${product.numReviews} review`} color={'#f8e825'} /> */}
              //         <Rating value={product.rating} text={`(${product.numReviews} )`} color={'#f8e825'} />
              //       </ListGroup.Item>
              //       {/* <ListGroup.Item>
              //   Price:${product.price}
              // </ListGroup.Item> */}
              //       <ListGroup.Item>
              //         <Row>
              //           <Col>
              //             Status:
              //           </Col>
              //           <Col>
              //             {product.countInStock > 0 ? 'in Stock' : 'Out of Stock'}
              //           </Col>
              //         </Row>
              //       </ListGroup.Item>
              //       {
              //         product.countInStock > 0 && (
              //           <ListGroup.Item>
              //             <Row>
              //               <Col>Qty</Col>
              //               <Col xs='auto' className='my-1'>
              //                 <Form.Control
              //                   as="select"
              //                   value={qty}
              //                   onChange={(e) => setQty(e.target.value)}
              //                 >
              //                   {
              //                     [...Array(product.countInStock).keys()].map((x) =>
              //                       <option key={x + 1} value={x + 1}>
              //                         {x + 1}
              //                       </option>)
              //                   }

              //                 </Form.Control>

              //               </Col>
              //             </Row>
              //           </ListGroup.Item>
              //         )
              //       }
              //       <ListGroup.Item>
              //         <div className="d-grid gap-2" >
              //           <Button 
              //           onClick={addToCart}
              //           className='btn-block' id='btn-st' 
              //           disabled={product.countInStock === 0} 
              //           type='button'>Add to Cart</Button>
              //         </div>
              //       </ListGroup.Item>
              //     </ListGroup>
              //     {/* </Card> */}
              //   </Col>
              // </Row>