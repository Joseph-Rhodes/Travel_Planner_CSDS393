import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../Media.css"

const Media = (props) => {

    
    const [formData, setFormData] = useState({});

    
        const [selectedImage1, setSelectedImage1] = useState(null);
        const [selectedImage2, setSelectedImage2] = useState(null);
        const [submittedData, setSubmittedData] = useState([]);
    
        const navigate = useNavigate();

        useEffect(() => {
            scrapBook();
          }, [props.user]); 
    
        const handleSubmit = (e) => {
            e.preventDefault();
            setSubmittedData((prevData) => [...prevData, { ...formData, image1: selectedImage1, image2: selectedImage2 }]);
            setFormData({destination: '',
            stay: '',
            activity: '',
            memory: '',
            eat: '',
            trip_description: '',});
            setSelectedImage1(null);
            setSelectedImage2(null);

            createPost(formData.destination, 
                formData.stay, 
                formData.activity, 
                formData.memory,
                formData.eat,
                selectedImage1,
                selectedImage2,
                formData.trip_description);
            
        };

        const createPost = (destination, 
            stay, 
            activity, 
            memory,
            eat,
            image1, 
            image2,
            trip_description) => {

                const uid = props.user[0].id;
                

            fetch('http://localhost:3001/post', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({destination, 
                    stay, 
                    activity, 
                    memory,
                    eat,
                    image1,
                    image2,
                    trip_description,
                    uid}),
            })

            .then(response => {
                if (response.status === 200) {
                    console.log("all g broski");
                }
                else {
                    console.log("tough luck");
                }
            })

            .catch(error => {
                console.log("backend error");
            })
        };


        const scrapBook = () => {

            const uid = props.user[0].id;

            fetch('http://localhost:3001/display', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({uid}),
            })

            .then(async response => {
                if (response.status === 200) {
                    const posts = await response.json();
                console.log(posts);
                    setSubmittedData(posts);
                }
                else {
                    console.log("tough luck");
                }
            })

            .catch(error => {
                console.log("backend error");
            })
        };
        

        const handleLogoutClick = () => {
            props.setUser(null);
        };
    
        const handleInputChange = (e) => {
            const { id, value } = e.target;
            setFormData((prevData) => ({
            ...prevData,
            [id]: value,
            }));
        };

        const handleImageChange = (e, imageNumber) => {
            const file = e.target.files[0];
          
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                // Convert the file to a binary array buffer
                const arrayBuffer = reader.result;
                const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
                const fileReader = new FileReader();
          
                fileReader.onloadend = () => {
                  // Compress the image using a canvas
                  const img = new Image();
                  img.src = fileReader.result;
          
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
          
                    // Set the canvas dimensions to the desired size
                    const maxWidth = 800; // Adjust as needed
                    const maxHeight = 600; // Adjust as needed
                    const width = Math.min(img.width, maxWidth);
                    const height = Math.min(img.height, maxHeight);
          
                    canvas.width = width;
                    canvas.height = height;
          
                    // Draw the image on the canvas
                    ctx.drawImage(img, 0, 0, width, height);
          
                    // Convert the compressed image to a binary array buffer
                    canvas.toBlob((compressedBlob) => {
                      const compressedReader = new FileReader();
          
                      compressedReader.onloadend = () => {
                        // Update the state with the compressed image data
                        if (imageNumber === 1) {
                          setSelectedImage1(compressedReader.result);
                          setFormData((prevData) => ({
                            ...prevData,
                            image1: compressedReader.result,
                          }));
                        } else if (imageNumber === 2) {
                          setSelectedImage2(compressedReader.result);
                          setFormData((prevData) => ({
                            ...prevData,
                            image2: compressedReader.result,
                          }));
                        }
                      };
          
                      compressedReader.readAsDataURL(compressedBlob);
                    }, file.type, 0.8); // Adjust quality as needed
                  };
                };
          
                fileReader.readAsDataURL(blob);
              };
          
              reader.readAsArrayBuffer(file);
            }
          };

          function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
  
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
  
    return btoa(binary);
  }


    return(
        <div> 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" onClick={() => navigate("/Homepage")}>MemMapper</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate("/Homepage")}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => navigate("/Itinerary")}>Create an Plan</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" onClick={() => navigate("/Media")}>Media</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="nav-link" onClick={(handleLogoutClick)}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='center'>
        <form className='mediaForm center' onSubmit={handleSubmit}>   
        
        
            
                <div className="col-md-6">
                
                    <div className="row">
                
                    <div className="form-group">
                        <label >Where did you go?</label>
                        <input className="form-control" id="destination" required value={formData.destination}
            onChange={handleInputChange}></input>
                    </div>
                    
                
                    </div>
                
                    <div className="row"style={{flex: 1}}>
                        <div className="form-group">
                            <label >Where did you stay?</label>
                            <input className="form-control" id="stay" required value={formData.stay}
            onChange={handleInputChange}></input>
                        </div>
                
                    </div>
                    
                
                    <div className="row" style={{flex: 1}}>
                        <div className="form-group">
                            <label >What was your favorite activity?</label>
                            <input className="form-control" id="activity" required value={formData.activity}
            onChange={handleInputChange}></input>
                        </div>

                    </div>
                    <div className="row" style={{flex: 1}}>
                        <div className="form-group">
                            <label>What was your favorite memory?</label>
                            <input className="form-control" id="memory" required value={formData.memory}
            onChange={handleInputChange}></input>
                        </div>

                    </div>
                    <div className="row" style={{flex: 1}}>
                        <div className="form-group">
                            <label>What was your favorite place to eat?</label>
                            <input className="form-control" id="eat" required value={formData.eat}
            onChange={handleInputChange}></input>
                        </div>

                
            
                    </div>
                    
                
                
            
                            
                                <div className="text-center">
                                <img id="selectedImage1" className="mainIcon1Media" src={selectedImage1 || "./assets/polaroidStock.jpg"}/>
                                    
                                        <div className="img-overlay">
                                            <div className="btn btn-primary btn-rounded btn-xs">
                                                <label className="form-label text-white m-1" htmlFor="customFile1">Choose a picture</label>
                                                <input required type="file" className="form-control d-none" id="customFile1" onChange={(e) => handleImageChange(e, 1)}/>
                                                
                                        </div>
                                    </div>
                                </div>
                                
                                <input type="submit" id="check" value="Post"/>
                        </div>
                        
                    
        
        
                <div className="col-md-6">
                    
                        <div className="text-center">
                        <img className="mainIcon1Media" id="selectedImage2" src={selectedImage2 || "./assets/polaroidStock.jpg"}/>
                            
                                <div className="img-overlay">
                                    <div className="btn btn-primary btn-rounded btn-xs">
                                        <label className="form-label text-white m-1" htmlFor="customFile2" required>Choose a picture</label>
                                        <input required type="file"  className="form-control d-none"  id="customFile2"onChange={(e) => handleImageChange(e, 2)} />
                                        
                                </div>
                            </div>
                        
                        </div>
                    
                
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Talk about your trip!</label>
                            <textarea className="form-control" id="trip_description" rows="19" required value={formData.trip_description}
            onChange={handleInputChange}></textarea>
                            
                        </div>
                    
            </div>
        
        
    
        
    </form>
    


    </div>
    <div className='container center' style={{backgroundColor: "white", maxWidth:'1000px'}}> 
    <div className='row center'>
        <h1 style={{textDecorationLine: 'underline'}}>View Your Past Trips!</h1>
    
    {submittedData && (
        <div className='container center'>
        
        <ul>
            {submittedData.map((data, index) => (
                
            <div key={index}>
                <div className='container center' style={{ border: '2px solid #000', padding: '10px', borderRadius: '10px', minWidth:'800px', margin:'5px'}}>
                <div className='row' style={{margin: '2px'}}>
                <div className='col-md-6'>
                <div className='row'>
                <h5>Where did you go?</h5>
                </div>
                <div className='row' >
                <p>
                    {data.destination}
                    
                </p>
                </div>
                
                <div className='row'>
                <h5>Where did you stay?</h5>
                </div>
                <div className='row'>
                <p>
                    {data.stay}
                </p>
                </div>
                <div className='row'>
                <h5>what was your favorite activity?</h5>
                </div>
                <div className='row'>
                <p>
                    {data.activity}
                </p>
                </div>
                <div className='row'>
                <h5>what was your favorite memory?</h5>
                </div>
                <div className='row'>
                <p>
                    {data.memory}
                </p>
                </div>
                
                
                <div className='row'>
                <h5>what was your favoite place to eat?</h5>
                </div>
                <div className='row'>
                <p>
                    {data.eat}
                </p>
                </div>
                <div className='row'>
                    {data.image1 && <img className='mainIcon1Media' src={`data:image/jpeg;base64,${data.image1.data}`} alt="Image 1" />}


                </div>

                </div>
                
                <div className='col-md-6'>
                    <div className='row center'>
                    {data.image2 && <img className='mainIcon1Media' src={`data:image/jpeg;base64,${data.image2.data}`} alt="Image 2" />}

                    </div>
                <div className='row center'>
                <h5>talk about your trip?</h5>
                </div>
                <div className='row'>
                <p>
                    {data.trip_description}
                </p>
                </div>
                </div>
</div>
            </div>
            </div>
            ))}
            
        </ul>

        
        </div>
    )}
    </div>
    </div>
</div>
    )
}


export default Media