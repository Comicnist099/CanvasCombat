import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [image, setImage] = useState();

  const idCharacter = searchParams.get("idCharacter");

  const getResponse = async () => {
    const response = await fetch(`/draw/${idCharacter}`);
    const body = await response.json();

    //console.log(idCharacter);

    if (body.isActive) {
      setRenderedResponsea(body);
      setFriends(body);
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
                  <label className="form-label">Nombre </label>
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
                  <label className="form-label">Nickname </label>
                  <input
                    placeholder=" "
                    className="form-control"
                    type="text"
                    name="lastname"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
