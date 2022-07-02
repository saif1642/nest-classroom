
## Description

A Virtual Classroom built with NestJS.



## Running the app

```
# run command (Install docker if don't have)
$ sudo docker-compose up

```


## Admin End Point

  <table>
    <thead>
      <tr>
        <th>End Point Name</th>
        <th>Url</th>
        <th>Method</th>
        <th>Payload</th>
        <th>Login Required</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>Admin Register</td>
            <td>baseURL/api/auth/admin/register</td>
            <td>POST</td>
            <td>{first_name:string, last_name:string, email:srting, password:string, confirm_password:string }</td>
            <td>N/A</td>
        </tr>
         <tr>
            <td>Admin Login</td>
            <td>baseURL/api/auth/admin/login</td>
            <td>POST</td>
            <td>{email:srting, password:string}</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Admin Logout</td>
            <td>baseURL/api/auth/admin/logout</td>
            <td>GET</td>
            <td>N/A</td>
            <td>Admin Login Required</td>
        </tr>
    </tbody>
  </table>
   

