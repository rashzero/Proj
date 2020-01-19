/* eslint-disable react/state-in-constructor */
import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class AvatarUpload extends React.Component {
  state = {
    imagePreviewUrl: '',
  };

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    const avatar = 'https://i.pinimg.com/236x/f9/ee/ac/f9eeac4c5785989919500487b12a66b9--pumpkin-template-printable-pumpkin-stencils.jpg';
    if (imagePreviewUrl) {
      $imagePreview = imagePreviewUrl;
    } else {
      $imagePreview = avatar;
    }

    return (
      <div>
        <ButtonBase className={this.props.classes.buttonBase}>
          <img src={$imagePreview} className={this.props.classes.image} />
        </ButtonBase>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <Button
            variant="contained"
            color="secondary"
            className={this.props.classes.button}
            component="label"
          >
            <input
              type="file"
              onChange={(e) => this.handleImageChange(e)}
              style={{ display: 'none' }}
            />
            <center>Изменить изображение</center>
          </Button>
        </form>
      </div>
    );
  }
}

const useStyles = withStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(3),
  },
  image: {
    width: 200,
    height: 230,
  },
  buttonBase: {
    marginBottom: 3,
  },
}))(AvatarUpload);

export default useStyles;
