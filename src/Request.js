async function Request({
  url,
  method = 'GET',
  body,
  redirect = 'follow',
}) {
  const responseResetPass = await fetch(url, {
    method,
    redirect,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const responseResetPassJson = await responseResetPass.json();
  return responseResetPassJson;
}

export default Request;
