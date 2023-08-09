import axios from 'axios';
import { Handler } from 'express';
import { b2Base } from '../constants';
import b2Auth from '../util/b2auth';

const list: Handler = async (req, res) => {
  const prefix = req.query.prefix?.toString() ?? '';
  const delimiter = req.query.delimiter?.toString() ?? '';

  console.log('list', prefix, delimiter);

  const paramsObj: Record<string, string> = {
    bucketId: process.env.bucketSourceId!,
    maxFileCount: '10000',
  };

  if (prefix !== '') {
    paramsObj.prefix = prefix;
  }

  if (delimiter !== '') {
    paramsObj.delimiter = delimiter;
  }

  const response = await axios
    .get(`${b2Auth.apiUrl}/b2api/v2/b2_list_file_names`, {
      params: new URLSearchParams(paramsObj),
      headers: {
        Authorization: b2Auth.token,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });

  if (response.status === 400) {
    res.status(400);
    return res.json({ errors: ['unknown error'] });
  }

  const files = response.files.map((file: any) => {
    return { id: file.fileId, name: file.fileName };
  });

  res.status(200);

  return res.json({
    errors: [],
    files,
  });
};

export default list;
