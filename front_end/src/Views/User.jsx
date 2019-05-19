import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

export class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 画像を表示するためにstateを作成します.
      profileImage: ""
    };
  }

  createUser = payload => {
    axios
      .post("http://localhost:3001/users", payload)
      .then(({ data, message }) => {
        if (data) {
          this.setState({ user: data });
        } else {
          throw new Error(message);
        }
      })
      .catch(e => alert(e.message));
  };

  //canvasにresizeした画像を描写した後にエンコード
  setImage = (e, setFieldValue) => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var maxW = 250;
    var maxH = 250;

    var img = new Image();
    img.onload = () => {
      var iw = img.width;
      var ih = img.height;
      var scale = Math.min(maxW / iw, maxH / ih);
      var iwScaled = iw * scale;
      var ihScaled = ih * scale;
      canvas.width = iwScaled;
      canvas.height = ihScaled;
      ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
      const resizeData = canvas.toDataURL("image/jpeg", 0.5);
      this.setState({ profileImage: resizeData });
      setFieldValue("profile_image", resizeData);
    };
    img.src = URL.createObjectURL(e.target.files[0]);
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          profile_image: ""
        }}
        onSubmit={this.createUser}
      >
        {({ setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <label>プロフィール画像</label>
              <img
                className="profile-image"
                src={!this.state.profileImage ? "" : this.state.profileImage}
              />
              <React.Fragment>
                <Field
                  id="select_profile_image"
                  type="file"
                  name="profile_image2"
                  onChange={e => this.setImage(e, setFieldValue)}
                />
                <Field type="hidden" name="profile_image" />
              </React.Fragment>
              <canvas
                id="canvas"
                style={{
                  display: "none"
                }}
                width="64"
                height="64"
              />
              <label>名前</label>
              <Field className="input" type="text" name="name" />
              <button
                className="submit-button"
                type="submit"
                disabled={isSubmitting}
              >
                送信
              </button>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default Users;
