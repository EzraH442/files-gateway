import axios from 'axios';
import { b2Base } from '../constants';

const b2IdAndKey = () => {
  return `${process.env.b2AppKeyId!}:${process.env.b2AppKey!}`;
};

const base64encode = (s: string) => {
  return Buffer.from(s).toString('base64');
};

const b2Auth = {
  token: null,
  apiUrl: null,
  updateToken: async () => {
    const data = await axios
      .get(`${b2Base}/b2_authorize_account`, {
        headers: {
          Authorization: `Basic ${base64encode(b2IdAndKey())}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    b2Auth.token = data?.authorizationToken ?? null;
    b2Auth.apiUrl = data?.apiUrl ?? null;
  },
};

export default b2Auth;
