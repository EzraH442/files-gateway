import axios from 'axios';
import {RequestHandler} from 'express';

const authenticate: RequestHandler = async (req, res, next) => {
  const authString = req.headers.authorization;
  const token = authString?.split(' ')[1];
  if (!token) {
    return res.json({status : 401, errors : [ 'missing token' ]});
  }

  let error = false;
  const verifyResponse = await axios
                             .post(
                                 process.env.authUrl!,
                                 new URLSearchParams({token}).toString(),
                                 )
                             .then((res) => res.data)
                             .catch((err) => {
                               error = true;
                               res.json({status : 500, errors : [ '' ]});
                             });

  if (!error) {
    if (!verifyResponse.valid) {
      return res.json({status : 401, errors : [ 'invalid token' ]});
    }

    next();
  }
};

export default authenticate;
