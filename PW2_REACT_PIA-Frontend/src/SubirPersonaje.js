export function SubirPersonaje()
{
return ( 
<>

<div className="col-11 center" style={{marginTop: "30px", marginLeft: "50px"}}>
<div className="row" >
<div className="one" >
<h1 style={{color: "white"}}>NEW FIGHTER</h1>

</div>
</div>
</div>

<div className="row w-100" data-aos="fade-up" id="profile" style={{marginTop: "150px", marginBottom: "150px"}}>



 


            <div className="m-auto w-25" data-aos="fade-up" data-aos-delay="450" id="loginSection" style={{background: "rgb(255, 255, 255)"}}>

                   

                    <form style={{marginBottom: "50px", marginTop: "50px"}}>


                        <div className="row center" style={{background: "rgb(120, 120, 120)", marginTop: "20px", marginBottom: "20px"}}>
                        <div className="col center" >
                        <div className="row" style={{margin: "15px"}}></div>

                        <div className="avatar-bg center"></div>
                        <input className="form-control form-control" type="file" name="avatar-file" style={{marginTop: "24px"}}></input>
                        <div className="row" style={{margin: "15px"}}></div>
                        
                        </div>

                        </div>

                        <div className="row" style={{margin: "30px"}}></div>



                        <div className="form-group mb-3">
                        <div className="row center">
                        <div className="col center" >
                            <label className="form-label text-secondary" style={{color: "rgb(255,255,255)!important"}}>Nombre</label>
                            <input  oninput="this.value = this.value.toUpperCase()"  id="phpEmailLogin"   name="phpEmailLogin"  className="form-control" type="text" required inputmode="email" placeholder="Nombre"></input>
                            </div>
                            </div>
                        </div>

                        <div className="row" style={{margin: "15px"}}></div>


                        <div className="form-group mb-3">
                            <div className="row center">
                            <div className="col center" >

                            <label className="form-label text-secondary" style={{color: "rgb(255,255,255)!important"}}>Descripcion</label>
                            <input id="phpPasswordLogin" name="phpPasswordLogin" className="form-control" type="password" required  placeholder="Descripcion"></input>

                            <div className="row" style={{margin: "30px"}}></div>


                            <button 
                            id = "logInButton"
                            className="btn btn-info mt-2" 
                            type="button"
                            onclick="loginFunction($('#phpEmailLogin').val(), $('#phpPasswordLogin').val());"
                            >AÑADIR</button>
                        
                            </div>
                            </div>
                        </div>
                        

                    </form>

                    
                </div>


            </div>




</>
)
}