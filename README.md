
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
         <tr>
            <td>Admin Teacher Create</td>
            <td>baseURL/api/auth/admin/teacher/create</td>
            <td>POST</td>
            <td>{first_name:string, last_name:string, email:srting, password:string, confirm_password:string }</td>
            <td>Admin Login Required</td>
        </tr>
    </tbody>
  </table>
   


## Teacher End Point

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
            <td>Teacher Login</td>
            <td>baseURL/api/auth/teacher/login</td>
            <td>POST</td>
            <td>{email:srting, password:string}</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Teacher Logout</td>
            <td>baseURL/api/auth/teacher/logout</td>
            <td>GET</td>
            <td>N/A</td>
            <td>Teacher Login Required</td>
        </tr>
         <tr>
            <td>Teacher Classroom Create</td>
            <td>baseURL/api/classroom/create</td>
            <td>POST</td>
            <td>{subject:string, teacher_id:number}</td>
            <td>Teacher Login Required</td>
        </tr>
        <tr>
            <td>Teacher Classroom End</td>
            <td>baseURL/api/classroom/teacher/classroom/end</td>
            <td>POST</td>
            <td>{classroom_id:number}</td>
            <td>Teacher Login Required</td>
        </tr>
         <tr>
            <td>Teacher Create Post</td>
            <td>baseURL/api/classroom/teacher/post/create</td>
            <td>POST</td>
            <td>{classroom_id:number, type:string, description:string, deadline:timestamp, marks:number}</td>
            <td>Teacher Login Required</td>
        </tr>
         <tr>
            <td>Teacher Post Result</td>
            <td>baseURL/api/classroom/teacher/post/result</td>
            <td>POST</td>
            <td>{result:number, student_id:number, post_id:number}</td>
            <td>Teacher Login Required</td>
        </tr> 
    </tbody>
  </table>


   