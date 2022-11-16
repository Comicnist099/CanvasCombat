import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import $, { get } from "jquery";

export function ProfileCharacter() {
  // ///////////IMAGEN////////////////
  const [{ alt, src }, setImg] = useState({
    src: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    alt: "Upload an Image",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };
  // ////////////////////////////////

  // /////////hook///////////
  let [renderedResponsea, setRenderedResponsea] = useState({});
  const [friends, setFriends] = useState([]);
  const [friendsUser, setfriendsUser] = useState();
  const [friendsUser2, setfriendsUser2] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [image, setImage] = useState();
  const [idUser, setIdUser] = useState();
  const [idOwner, setIdOwner] = useState();

  const idCharacter = searchParams.get("idCharacter");
  const myImageStyle = {
    width: "1090px",
    maxHeight: "2400",
  };

  const getResponse = async () => {
    const response = await fetch(`/draw/${idCharacter}`);
    const body = await response.json();

    if (body.isActive) {
      setRenderedResponsea(body);
      setFriends(body);

      const responseUser = await fetch(`/users/${body.cartoonist}`);
      const bodyUser = await responseUser.json();
      const responseUser2 = await fetch(`/users/${body.owner}`);
      const bodyUser2 = await responseUser2.json();

      setIdUser(body.cartoonist);
      setIdOwner(body.owner);
      setfriendsUser(bodyUser.nickname);
      setfriendsUser2(bodyUser2.nickname);
      setImage(body.image.path);
    }

    if (response.status !== 200) throw Error(body.message);
  };
  // ///////////////Redes Sociales////////////////////

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <>
      <div
        className="col-11 center"
        style={{
          marginTop: "30px",
          marginLeft: "90px",
        }}
      >
        <div className="row">
          <div className="one">
            <h1 style={{ color: "white" }}>Perfil de Personaje</h1>
          </div>
        </div>
      </div>

      <div class="container text-center">
        <div
          className="container profileCharacter profile-view"
          data-aos="fade-up"
          id="profile"
          style={{
            marginTop: "50px",
            background: "rgb(129, 129, 129)",
          }}
        >
          <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
            <div className="col-md-12 ">
              <h1> {friends.character} </h1>
              <hr></hr>

              <div>
                <img
                  style={myImageStyle}
                  src={image}
                  alt=" "
                  className="form-img__img-preview"
                ></img>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <p className="form-label">Nombre</p>
                    <input
                      value={friends.character}
                      className="form-control"
                      disabled
                      name="firstname"
                    ></input>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <p className="form-label">Descripcion</p>
                    <textarea
                      value={friends.descripcion}
                      class="form-group"
                      rows="5"
                      className="form-control"
                      disabled
                      style={{ resize: "none" }}
                      name="lastname"
                    ></textarea>
                  </div>
                </div>

                <br></br>

                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <p className="form-label">Fecha de creacion</p>
                    <input
                      value={friends.creationDate}
                      className="form-control"
                      disabled
                      name="firstname"
                    ></input>
                    <br></br>
                    <p className="form-label">Character info:</p>

                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td class="w-25 text-right bg-light">
                            <b>Owner</b>
                          </td>
                          <td>
                            <strong>
                              <a href={"/Profile?idUser=" + idOwner}>
                                {friendsUser2}{" "}
                              </a>
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td class="w-25 text-right bg-light">
                            <b>Designer</b>
                          </td>
                          <td>
                            <strong>
                              <a href={"/Profile?idUser=" + idUser}>
                                {friendsUser}{" "}
                              </a>
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <br></br>
                  </div>
                </div>

                <a
                  href={"/SubirAtaque?idCharacter=" + friends._id}
                  class="btn btn-danger btn-lg"
                >
                  <h3 style={{ color: "white" }}>ATACAR</h3>
                </a>

                <a
                  style={{ marginTop: "20px" }}
                  href={"/MisAtaques?idCharacter=" + friends._id}
                  class="btn btn-primary"
                >
                  Ataques recibidos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5">
        <div class="row  d-flex justify-content-center">
          <div class="col-md-8">
            <div class="headings d-flex justify-content-between align-items-center mb-3">
              <h5>Unread comments(6)</h5>

              <div class="buttons">
                <span class="badge bg-white d-flex flex-row align-items-center">
                  <span class="text-primary">Comments "ON"</span>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      checked
                    ></input>
                  </div>
                </span>
              </div>
            </div>

            <div class="card p-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="user d-flex flex-row align-items-center">
                  <img
                    src="https://i.imgur.com/hczKIze.jpg"
                    width="30"
                    class="user-img rounded-circle mr-2"
                  ></img>
                  <span>
                    <small class="font-weight-bold text-primary">
                      james_olesenn
                    </small>
                    <small class="font-weight-bold">
                      Hmm, This poster looks cool
                    </small>
                  </span>
                </div>

                <small>2 days ago</small>
              </div>

              <div class="action d-flex justify-content-between mt-2 align-items-center">
                <div class="reply px-4">
                  <small>Remove</small>
                  <span class="dots"></span>
                  <small>Reply</small>
                  <span class="dots"></span>
                  <small>Translate</small>
                </div>

                <div class="icons align-items-center">
                  <i class="fa fa-star text-warning"></i>
                  <i class="fa fa-check-circle-o check-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
