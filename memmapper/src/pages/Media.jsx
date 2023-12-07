        import React, { useState } from 'react'
        import "../Media.css"


        function Media(){

            
            const [formData, setFormData] = useState({});

            
                const [selectedImage1, setSelectedImage1] = useState(null);
                const [selectedImage2, setSelectedImage2] = useState(null);
                const [submittedData, setSubmittedData] = useState([]);
            
                const displaySelectedImage = (e, setSelectedImage) => {
                const file = e.target.files[0];
                const reader = new FileReader();
            
                reader.onloadend = () => {
                    setSelectedImage(reader.result);
                };
            
                if (file) {
                    reader.readAsDataURL(file);
                }
                };
            
                const handleSubmit = (e) => {
                    e.preventDefault();
                    setSubmittedData((prevData) => [...prevData, { ...formData, image1: selectedImage1, image2: selectedImage2 }]);
                    setFormData({place: '',
                    hotel: '',
                    activity: '',
                    memory: '',
                    resturant: '',
                    exampleFormControlTextarea1: '',});
                    setSelectedImage1(null);
                    setSelectedImage2(null);
                    
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
                        if (imageNumber === 1) {
                        setSelectedImage1(reader.result);
                        setFormData((prevData) => ({
                            ...prevData,
                            image1: file,
                        }));
                        } else if (imageNumber === 2) {
                        setSelectedImage2(reader.result);
                        setFormData((prevData) => ({
                            ...prevData,
                            image2: file,
                        }));
                        }
                    };
                    reader.readAsDataURL(file);
                    }
                };
            


            return(
                <div> 
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#">MemMapper</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="Homepage">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="Itinerary">Create an Plan</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="Media">Media</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <button className="nav-link" href="#">User</button>
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
                                <input className="form-control" id="place" required value={formData.place}
                    onChange={handleInputChange}></input>
                            </div>
                            
                        
                            </div>
                        
                            <div className="row"style={{flex: 1}}>
                                <div className="form-group">
                                    <label >Where did you stay?</label>
                                    <input className="form-control" id="hotel" required value={formData.hotel}
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
                                    <input className="form-control" id="resturant" required value={formData.resturant}
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
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="19" required value={formData.exampleFormControlTextarea1}
                    onChange={handleInputChange}></textarea>
                                    
                                </div>
                            
                    </div>
                
                
            
                
            </form>
            
        

            </div>
            <div className='container center' style={{backgroundColor: "white", maxWidth:'1000px'}}> 
            <div className='row center'>
                <h1 Style={{textDecorationLine: 'underline'}}>View Your Past Trips!</h1>
            
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
                            {data.place}
                            
                        </p>
                        </div>
                        
                        <div className='row'>
                        <h5>Where did you stay?</h5>
                        </div>
                        <div className='row'>
                        <p>
                            {data.hotel}
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
                            {data.resturant}
                        </p>
                        </div>
                        <div className='row'>
                        {data.image1 && <img className='mainIcon1Media' src={data.image1} alt="Selected Image 1" />}


                        </div>

                        </div>
                        
                        <div className='col-md-6'>
                            <div className='row center'>
                            {data.image2 && <img className='mainIcon1Media' src={data.image2} alt="Selected Image 2" />}

                            </div>
                        <div className='row center'>
                        <h5>talk about your trip?</h5>
                        </div>
                        <div className='row'>
                        <p>
                            {data.exampleFormControlTextarea1}
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