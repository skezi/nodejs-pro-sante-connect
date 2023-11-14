import axios from 'axios';

export async function request<T>(params: {
  method: any,
  url: string,
  data?: any,
  token?: string,
}): Promise<T> {
    const { data } = await axios({
      method: params.method,
      url: params.url,
      data: params.data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(params.token && {Authorization: `Bearer ${params.token}`})
      },
      responseType: 'json',
    });

    return data;
}
