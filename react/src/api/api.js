export const login = async (email) => {
  try {
    const response = await fetch('/syb-bank/login', {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email
      })
    })
    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const register = async (first_name, last_name, email, password, area_code, phone) => {
  try {
    const response = await fetch('/bookmate/v1/create-account', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
      }),
    })

    const data = await response.ok
    return data
  } catch (err) {
    return err
  }
}