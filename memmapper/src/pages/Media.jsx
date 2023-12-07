import React, { useState } from 'react'
import "../Media.css"


function Media(){

    const [selectedImage1, setSelectedImage1] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);

    // user to upload photos from their device
    const displaySelectedImage = (event, setImageFunction) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFunction(reader.result);
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
          <form className='mediaForm center'>   
         
        
            
                <div className="col-md-6">
                   
                    <div className="row">
                
                    <div className="form-group">
                        <label >Where did you go?</label>
                        <input className="form-control" id="place" required></input>
                    </div>
                    
                
                    </div>
                
                    <div className="row"style={{flex: 1}}>
                        <div className="form-group">
                            <label >Where did you stay?</label>
                            <input className="form-control" id="hotel" required ></input>
                        </div>
                
                    </div>
                    
                
                    <div className="row" style={{flex: 1}}>
                        <div className="form-group">
                            <label >What was your favorite activity?</label>
                            <input className="form-control" id="activity" required></input>
                        </div>

                    </div>
                    <div className="row" style={{flex: 1}}>
                        <div className="form-group">
                            <label>What was your favorite memory?</label>
                            <input className="form-control" id="memory" required></input>
                        </div>

                    </div>
                    <div className="row" style={{flex: 1}}>
                        <div className="form-group">
                            <label>What was your favorite place to eat?</label>
                            <input className="form-control" id="resturant" required></input>
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
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="19" required></textarea>
                            
                        </div>
                    
            </div>
        
        
       
        
    </form>
    </div>
</div>
    )
}

export default Media