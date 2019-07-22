// https://www.npmjs.com/package/node-fetch
import fetch from 'node-fetch';

export async function get(url: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const res = await fetch(url);
    return res.json();
}