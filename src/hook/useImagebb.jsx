import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UseImagebb = async (image) => {
    const res = await axios.post(image_hosting_api, {image},{
      headers:{
        'content-type': 'multipart/form-data'
      }
    })
 
    const imageUrl = res?.data?.data?.display_url

    return imageUrl;
 
};

export default UseImagebb;