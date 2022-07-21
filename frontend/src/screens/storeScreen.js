// show category of screen 
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { typeList } from '../actions/productAction'

function StoreScreen() {
    // this code is for get window width and hight
    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    })
    const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        })
    }
    useEffect(() => {
        window.addEventListener('resize', detectSize)
        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimenion])

    const listType = useSelector(state => state.listType)
    const { error, loading, list } = listType
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(typeList())
    }, [dispatch])


    const [keyword, setKeyword] = useState('')
    const [type, setType] = useState('')
    localStorage.setItem('type', setType);
    localStorage.setItem('type', setType ? type : '');

    let history = useHistory()
    const submitHandler = (e) => {
        e.prventDefault()
        if (type) {
            history.push(`/?item=${type}`)
        }
    }
    useEffect(() => {
        if (keyword) {
            history.push(`/store/?keyword=${keyword}`)
        }
        else if (!keyword) {
            history.push(`/store/`)
        }
    }, [keyword]);
    return (
        <div >
            <div id="recyclerView">
                {list.map((item, index) => {

                    return (
                        <Link
                            key={index}
                            to='/store'
                            onClick={() => setType([item.name])}
                            className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 mu-2 mt-2 ms-2"
                            replace
                        >
                            <Col id='colbtn'>  {item.name}</Col>
                        </Link>
                    );
                })}
                <div>
                </div>
            </div>
            {windowDimenion.winWidth <= 576 ? <div className="search">
                <input type="text" className="ml-2 me-2 mb-2 mu-2 ms-2" style={{ width: '100%', height: '100%' }} onChange={(e) => setKeyword(e.target.value)} placeholder="search...." />
            </div> : ''}

        </div>
    )
}

export default StoreScreen


// {categories.map((v, i) => {
//     return (
//         <Link
//             key={i}
//             to="/"
//             className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
//             replace
//         >
//             {v}
//         </Link>
//     );
// })}



// {loading ? <Loader />
// : error ? <Message variant='danger'>{error}</Message>
//     : (
//         <Row>
//             <Col>

//             </Col>
//         </Row>
//     )
// }





// {
//     list.map((list) => (
//         <ol key={list.id} >
//             <Card className='my-3' id='card-rad'>
//                 <Link >
//                     <Card.Img id='img-rad' src={list.image} />
//                 </Link>
//                 <Card.Body className='p-4'>
//                     <Card.Text as="div">
//                         <div className='h3'>
//                             {list.name}
//                         </div>
//                     </Card.Text>
//                 </Card.Body>
//             </Card>

//         </ol>
//     ))
// }