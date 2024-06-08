// pages/api/ip.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { networkInterfaces, NetworkInterfaceInfo } from 'os';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const nets = networkInterfaces();
  const results: Record<string, string[]> = {};

  for (const name of Object.keys(nets)) {
    const netArray: NetworkInterfaceInfo[] = nets[name]!;
    for (const net of netArray) {
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  res.status(200).json(results);
}
