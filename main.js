const http = require('http')
const https = require('https')
const axios = require('axios')
const qs = require('qs')
const hostname = '127.0.0.1'
const port = 3000

//get code example
//https://namsookill1.cafe24api.com/api/v2/oauth/authorize?response_type=code&client_id=RrCRPGGaAFtqE9YYoBfofF&state=&redirect_uri=https://namsookill.cafe24.com/redirect.php&scope=mall.write_mileage,mall.read_mileage,mall.read_customer
const cafe24Code = 'GZq2gavyG1upaDq9KbV7FD'
const mallId = 'namsookill1'
const apiHost = `https://${mallId}.cafe24api.com`
const clientId = 'RrCRPGGaAFtqE9YYoBfofF'
const clientSecret = 'gv2pyeJHEalVPV2ncQoVuB'
const buf = Buffer.from(clientId + ':' + clientSecret, 'utf8')

let token = '';


//get token
async function getAccessToken() {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${buf.toString('base64')}`
    }, 
  }
  const data = qs.stringify({ 
    grant_type: 'authorization_code',
    code: cafe24Code,
    redirect_uri: 'https://namsookill.cafe24.com/redirect.php',
  })
  const apiUrl = `${apiHost}/api/v2/oauth/token`
  try {
    const tokenRequest = await axios.post(apiUrl, data, config)
    const { access_token } = tokenRequest.data
    return access_token;
  } catch (error) {
    console.log('error::',error.response.data)
    return false
  }
}
async function getUsers() {
  const apiUrl = `${apiHost}/api/v2/admin/customers?member_id=test`
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Cafe24-Api-Version': '2021-03-01'
    }, 
  }
  try {
    console.log('config::',config)
    const userRequest = await axios.get(apiUrl, config)
    return userRequest.data
  } catch (error) {
    console.log('users error::',error.response.data)
    return false
  }
}

async function getUserGroups() {
  const apiUrl = `${apiHost}/api/v2/admin/customergroups`
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Cafe24-Api-Version': '2021-03-01'
    }, 
  }
  try {
    const userRequest = await axios.get(apiUrl, config)
    //console.log('UserGroups result::', userRequest.data)
    return userRequest.data;
  } catch (error) {
    console.log('UserGroups error::',error.response.data)
    return false
  }
}

async function init() {
  token = await getAccessToken()
  if (token === false) {
    console.error('require token');
    return false
  }
  //token = '5IW2eVRNXKARz2XF1crAeO'
  const users = await getUsers()
  const userGroups = await getUserGroups()
  console.log('token', token)
  console.log('users', users)
  console.log('userGroups', userGroups)
}
init()