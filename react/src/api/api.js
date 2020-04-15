export const login = async (email) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log("ERR ", err)
    return err
  }
}

export const register = async (first_name, last_name, email, password, area_code, phone) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        area_code: area_code,
        phone: phone
      }),
    })

    const data = response.ok
    return data
  } catch (err) {
    return err
  }
}

export const get_user_details = async () => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/user-details', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const get_transaction_history = async (account_num) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/transaction-history', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account_num: account_num
      })
    })
    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const get_admin_details = async () => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/admin-details', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const transfer = async (acc_from, acc_to, amount) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/transfer', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        acc_from: acc_from,
        acc_to: acc_to,
        amount: amount
      })
    })

    const data = response.ok
    return data
  } catch (err) {
    return err
  }
}

export const withdraw = async (acc_from, amount) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/withdraw', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        acc_from: acc_from,
        amount: amount
      })
    })

    const data = response.ok
    return data
  } catch (err) {
    return err
  }
}

export const deposit = async (acc_to, amount) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/deposit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        acc_to: acc_to,
        amount: amount
      })
    })

    const data = response.ok
    return data
  } catch (err) {
    return err
  }
}

export const create_bank_account = async (acc_type, starting_balance) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/create-bank-account', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        acc_type: acc_type,
        starting_balance: starting_balance
      })
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const modify_customer = async (user_id, first_name, last_name, area_code, phone, email, password) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/modify-customer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        area_code: area_code,
        phone: phone
      }),
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const review_transaction = async (transaction_id, approved) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/review-transaction', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id: transaction_id,
        approved: approved
      })
    })

    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    return err
  }
}

export const delete_account = async (account_num) => {
  try {
    const response = await fetch('http://localhost:5000/syb-bank/delete-account', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_num: account_num
      })
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}