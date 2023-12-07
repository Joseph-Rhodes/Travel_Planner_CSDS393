import React, { useState } from 'react'
import "../Media.css"


function Media(){

    
        const [formData, setFormData] = useState({
          place: '',
          hotel: '',
          activity: '',
          memory: '',
          resturant: '',
          // Add other form fields as needed
        });
      
        const [selectedImage1, setSelectedImage1] = useState(null);
        const [selectedImage2, setSelectedImage2] = useState(null);
        const [submittedData, setSubmittedData] = useState(null);
      
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
          console.log('Form submitted:', formData);
          // Handle form submission logic here
          // You can update state, send data to a server, etc.
        };
      
        const handleInputChange = (e) => {
          const { id, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            [id]: value,
          }));
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
                                                <input required type="file" className="form-control d-none" id="customFile1" onChange={(e) => displaySelectedImage(e, setSelectedImage1)} />
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
                                        <input required type="file"  className="form-control d-none"  id="customFile2" onChange={(e) => displaySelectedImage(e, setSelectedImage2)} />
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
    <div>
    {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <ul>
            {Object.entries(submittedData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          {/* Display images */}
          {selectedImage1 && <img className="mainIcon1Media" src={selectedImage1} alt="Selected Image 1" />}
          {selectedImage2 && <img className="mainIcon1Media" src={selectedImage2} alt="Selected Image 2" />}
        </div>
      )}
    </div>
  

    </div>
</div>
    )
}


export default Media