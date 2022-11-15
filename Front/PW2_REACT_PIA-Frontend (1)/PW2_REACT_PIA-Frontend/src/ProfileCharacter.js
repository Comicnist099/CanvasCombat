import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import $, { get } from "jquery";

export function ProfileCharacter() {
  /////////////IMAGEN////////////////
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
  //////////////////////////////////

  ///////////hook///////////
  let [renderedResponsea, setRenderedResponsea] = useState({});
  const [friends, setFriends] = useState([]);
  const [friendsUser, setfriendsUser] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [image, setImage] = useState();

  const idCharacter = searchParams.get("idCharacter");
  const idUser = searchParams.get("idUser");

  const getResponse = async () => {
    const response = await fetch(`/draw/${idCharacter}`);
    const body = await response.json();

    const responseUser = await fetch(`/users/${idUser}`);
    const bodyUser = await responseUser.json();

    if (body.isActive) {
      setRenderedResponsea(body);
      setFriends(body);
      setfriendsUser(bodyUser);
      setImage(body.image.path);
    }

    if (response.status !== 200) throw Error(body.message);
  };
  /////////////////Redes Sociales////////////////////

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <>
      <div
        className="col-11 center"
        style={{ marginTop: "30px", marginLeft: "50px" }}
      >
        <div className="row">
          <div className="one">
            <h1 style={{ color: "white" }}>Perfil de Personaje</h1>
          </div>
        </div>
      </div>

      <div
        className="container profile profile-view"
        data-aos="fade-up"
        id="profile"
        style={{ marginTop: "50px", background: "rgb(129, 129, 129)" }}
      >
        <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
          <div className="col-md-4 content-right">
            <div className="avatar" style={{ marginTop: "21px" }}>
              <img
                height="200"
                width="200"
                src={image}
                alt=" "
                className="form-img__img-preview"
              />
            </div>
          </div>

          <div className="col-md-8 ">
            <h1> {friends.character} </h1>
            <hr></hr>

            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="form-group mb-3">
                  <p className="form-label">Nombre </p>
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
                  <p className="form-label">Descripcion </p>
                  <textarea
                    value={friends.descripcion}
                    class="form-group"
                    rows="7"
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
                  <p className="form-label">Fecha de creacion </p>
                  <input
                    value={friends.creationDate}
                    className="form-control"
                    disabled
                    name="firstname"
                  ></input>
                  <br></br>
                  <p className="form-label">Character info: </p>

                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td class="w-25 text-right bg-light">
                          <b>Owner</b>
                        </td>
                        <td>
                          <strong>
                            <a href={"/Profile?idUser=" + idUser}>
                              {friendsUser.nickname}
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
                              {friendsUser.nickname}
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
                href={"/ProfileCharacter?idCharacter="}
                class="btn btn-primary"
              >
                Ataques recibidos
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
