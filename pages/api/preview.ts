import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.DATOCMS_API_TOKEN) {
    return res
      .status(401)
      .json({ message: 'Invalid preview secret' });
  }

  res.setPreviewData({});
  res.redirect(req.query.slug as string || '/');
}
