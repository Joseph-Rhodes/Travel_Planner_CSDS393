import React from 'react'

function Media(){
    return(
        <div> 
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">MemMapper</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="Itinerary">Create an Plan</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="Media">Media</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <button class="nav-link" href="#">User</button>
                            </li>
                        </ul>
                    </div>
                </nav>
          <form>   
         <div class="container">
        <div class="row">
            <div class="container" id="myForm">
                <div class="col-md-6">
                   
                    <div class="row">
                
                    <div class="form-group">
                        <label >Where did you go?</label>
                        <input class="form-control" id="place" required></input>
                    </div>
                    
                
                    </div>
                
                    <div class="row">
                        <div class="form-group">
                            <label >Where did you stay?</label>
                            <input class="form-control" id="hotel" required ></input>
                        </div>
                
                    </div>
                    
                
                    <div class="row">
                        <div class="form-group">
                            <label >What was your favorite activity?</label>
                            <input class="form-control" id="activity" required></input>
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label >What was your favorite memory?</label>
                            <input class="form-control" id="memory" required></input>
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label >What was your favorite place to eat?</label>
                            <input class="form-control" id="resturant" required></input>
                        </div>

                
            
                    </div>
                    
                
                </div>
            <div class="col-md-6">
                            <div class="d-flex justify-content-center">
                                <div class="text-center">
                                <img id="selectedImage1" class="mainIcon1" src="./src/assets/polaroidStock.jpg"  alt="Responsive image"/>
                                    
                                        <div class="img-overlay">
                                            <div class="btn btn-primary btn-rounded btn-xs">
                                                <label class="form-label text-white m-1" for="customFile1">Choose a picture</label>
                                                <input required type="file" class="form-control d-none" id="customFile1" onchange="displaySelectedImage(event, 'selectedImage1')" />
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
        <div class="row">
            <div class="container">
                <div class="col-md-6">
                    <div class="d-flex justify-content-center">
                        <div class="text-center">
                        <img class="mainIcon1" id="selectedImage2" src="./src/assets/polaroidStock.jpg"  alt="Responsive image"/>
                            
                                <div class="img-overlay">
                                    <div class="btn btn-primary btn-rounded btn-xs">
                                        <label class="form-label text-white m-1" for="customFile2" required>Choose a picture</label>
                                        <input required  type="file" class="form-control d-none" id="customFile2" onchange="displaySelectedImage(event, 'selectedImage2')" />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Talk about your trip!</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="19" required></textarea>
                            
                        </div>
                    </div>
            </div>
        </div>
        <div class="row">
           
        </div>
        </div>
        <input type="submit" id="check" value="Post"/>
    </form>
</div>
    )
}

export default Media